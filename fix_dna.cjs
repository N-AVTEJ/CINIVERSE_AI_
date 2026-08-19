const fs = require('fs');

function fixShallow(file, hookName, prop) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes(`const { ${prop} } = ${hookName}()`)) {
    content = content.replace(`const { ${prop} } = ${hookName}()`, `const ${prop} = ${hookName}(s => s.${prop})`);
    fs.writeFileSync(file, content);
  } else if (content.includes(`const { ${prop} } = ${hookName}(`)) {
     // Already fixed?
  }
}

fixShallow('src/components/movie-dna/DNAExplanationPanel.tsx', 'useDNAAnimation', 'activeAttributeId');
fixShallow('src/components/movie-dna/DNAAttributeNode.tsx', 'useDNAAnimation', 'activeAttributeId');
fixShallow('src/components/movie-dna/DNALighting.tsx', 'useDNAAnimation', 'activeAttributeId');
fixShallow('src/components/movie-dna/DNAFog.tsx', 'useDNAAnimation', 'activeAttributeId');
fixShallow('src/components/movie-dna/DNACamera.tsx', 'useDNAAnimation', 'progress');
fixShallow('src/components/movie-dna/DNAStrand.tsx', 'useDNAAnimation', 'progress');

