const fs = require('fs');

function fixShallow(file, hookName, prop1, prop2) {
  let content = fs.readFileSync(file, 'utf8');
  if (prop2 && content.includes(`const { ${prop1}, ${prop2} } = ${hookName}()`)) {
    content = content.replace(
      `const { ${prop1}, ${prop2} } = ${hookName}()`, 
      `const { ${prop1}, ${prop2} } = ${hookName}(\n    useShallow(s => ({ ${prop1}: s.${prop1}, ${prop2}: s.${prop2} }))\n  )`
    );
    if (!content.includes("useShallow")) {
      content = "import { useShallow } from 'zustand/react/shallow';\n" + content;
    }
    fs.writeFileSync(file, content);
  } else if (prop2 && content.includes(`const { ${prop2}, ${prop1} } = ${hookName}()`)) {
    content = content.replace(
      `const { ${prop2}, ${prop1} } = ${hookName}()`, 
      `const { ${prop2}, ${prop1} } = ${hookName}(\n    useShallow(s => ({ ${prop2}: s.${prop2}, ${prop1}: s.${prop1} }))\n  )`
    );
    if (!content.includes("useShallow")) {
      content = "import { useShallow } from 'zustand/react/shallow';\n" + content;
    }
    fs.writeFileSync(file, content);
  }
}

fixShallow('src/components/ai-brain/SimilarityPanel.tsx', 'useRecommendationGraph', 'activeNode', 'isThinking');
fixShallow('src/components/ai-brain/RecommendationPanel.tsx', 'useRecommendationGraph', 'recommendedNodes', 'isThinking');

