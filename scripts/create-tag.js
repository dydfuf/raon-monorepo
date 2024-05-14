const shell = require("shelljs");
const fs = require("fs");
const semver = require("semver");
const { Select } = require("enquirer");

(async () => {
  // 1. get apps and packages
  const apps = fs.readdirSync("apps").map((app) => `apps/${app}`);
  const packages = fs.readdirSync("packages").map((pkg) => `packages/${pkg}`);

  // 2. select app or package
  const selectAppPrompt = new Select({
    name: "type",
    message: "Select app or package",
    choices: [...apps, ...packages],
  });

  const selectedService = await selectAppPrompt.run();

  // 3. get current version
  const currentVersion = require(`../${selectedService}/package.json`).version;

  console.log(`Current version: ${currentVersion}`);
  // 4. get semver type
  const selectSemverTypePrompt = new Select({
    name: "type",
    message: "Select semver type",
    choices: ["patch", "minor", "major"],
  });
  const semverType = await selectSemverTypePrompt.run();

  // 5. get new version
  const newVersion = semver.inc(currentVersion, semverType);
  console.log(`New version: ${newVersion}`);

  const confirmPrompt = new Select({
    name: "type",
    message: [
      `Are you sure you want to create a new tag?`,
      `Selected service: ${selectedService}`,
      `Current version: ${currentVersion}`,
      `New version: ${newVersion}`,
    ].join("\n"),
    choices: ["yes", "no"],
  });
  const confirmed = await confirmPrompt.run();
  if (confirmed === "no") {
    console.log("Aborted");
    return;
  }

  // 6. create tag
  shell.exec(`cd ${selectedService} && pnpm version ${newVersion}`);
  console.log("Package version updated.");

  shell.exec(
    `git add . && git commit -m "Release @${selectedService}-${newVersion}"`
  );
  console.log("Commit created.");

  const newTagName = `${selectedService.split("/")[1]}-${newVersion}`;
  shell.exec(`git tag -a ${newTagName} -m "Release ${newVersion}"`);
  console.log("Tag created.");

  // 7. push tag
  shell.exec(`git push && git push origin ${newTagName}`);
})();
