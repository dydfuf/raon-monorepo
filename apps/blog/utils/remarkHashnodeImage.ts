//![]() -> <img src="" alt="" />
import { visit } from "unist-util-visit";

export default function remarkHashnodeImage() {
  const imageRegex = /!\[(.*?)\]\((.*?)\)/g;

  return (tree) => {
    visit(tree, "text", (node) => {
      const { value } = node;
      const matches = value.match(imageRegex);

      if (matches) {
        console.log(matches);
      }
    });
  };
}

// const visit = require('unist-util-visit');

// function remarkAlignImages() {
//   return (tree) => {
//     visit(tree, 'image', (node) => {
//       const { alt, url, title } = node;
//       if (title && title.includes('align=')) {
//         const match = title.match(/align="(.*?)"/);
//         if (match) {
//           const align = match[1];
//           node.data = {
//             hProperties: {
//               align: align,
//             },
//           };
//           // Remove the align part from the title
//           node.title = title.replace(/align=".*?"/, '').trim();
//         }
//       }
//     });
//   };
// }

// module.exports = remarkAlignImages;
