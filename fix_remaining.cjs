const fs = require('fs');

function fixShallow(file, hookName, props) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Create variations to match exactly what is there
  const joinedProps = props.join(', ');
  if (content.includes(`const { ${joinedProps} } = ${hookName}()`)) {
    const selectorProps = props.map(p => `${p}: s.${p}`).join(', ');
    content = content.replace(
      `const { ${joinedProps} } = ${hookName}()`, 
      `const { ${joinedProps} } = ${hookName}(\n    useShallow(s => ({ ${selectorProps} }))\n  )`
    );
    if (!content.includes("useShallow")) {
      content = "import { useShallow } from 'zustand/react/shallow';\n" + content;
    }
    fs.writeFileSync(file, content);
  } else if (props.length === 1 && content.includes(`const { ${props[0]} } = ${hookName}()`)) {
    content = content.replace(
      `const { ${props[0]} } = ${hookName}()`, 
      `const ${props[0]} = ${hookName}(s => s.${props[0]})`
    );
    fs.writeFileSync(file, content);
  } else if (props.length === 3) {
      // we might have different ordering... try to just match any combination
  }
}

function fixShallowReplaceRegex(file, hookName, props) {
    let content = fs.readFileSync(file, 'utf8');
    const regex = new RegExp(`const \\{\\s*(${props.join('|')})\\s*(,\\s*(${props.join('|')})\\s*)*\\}\\s*=\\s*${hookName}\\(\\);?`);
    const match = content.match(regex);
    if (match) {
        // extract the actual properties matched
        const matchedProps = match[0].match(/\{([^}]+)\}/)[1].split(',').map(s => s.trim());
        const selectorProps = matchedProps.map(p => `${p}: s.${p}`).join(', ');
        
        content = content.replace(
            match[0],
            `const { ${matchedProps.join(', ')} } = ${hookName}(\n    useShallow(s => ({ ${selectorProps} }))\n  );`
        );
        if (!content.includes("useShallow")) {
            content = "import { useShallow } from 'zustand/react/shallow';\n" + content;
        }
        fs.writeFileSync(file, content);
    }
}

function fixSingleRegex(file, hookName, prop) {
    let content = fs.readFileSync(file, 'utf8');
    const regex = new RegExp(`const \\{\\s*${prop}\\s*\\}\\s*=\\s*${hookName}\\(\\);?`);
    const match = content.match(regex);
    if (match) {
        content = content.replace(
            match[0],
            `const ${prop} = ${hookName}(s => s.${prop});`
        );
        fs.writeFileSync(file, content);
    }
}

fixShallowReplaceRegex('src/components/genre-galaxy/PlanetInfoPanel.tsx', 'usePlanetFocus', ['focusedPlanetId', 'setFocusedPlanetId']);
fixSingleRegex('src/components/genre-galaxy/GenreGalaxy.tsx', 'usePlanetFocus', 'focusedPlanetId');
fixShallowReplaceRegex('src/components/genre-galaxy/GenrePlanet.tsx', 'usePlanetFocus', ['focusedPlanetId', 'setFocusedPlanetId', 'setHoveredPlanetId']);
fixSingleRegex('src/components/genre-galaxy/GalaxyCamera.tsx', 'usePlanetFocus', 'focusedPlanetId');

fixShallowReplaceRegex('src/components/ai-brain/NeuralSphere.tsx', 'useRecommendationGraph', ['activeNode', 'recommendedNodes', 'isThinking']);
fixSingleRegex('src/components/ai-brain/AIBrainScene.tsx', 'useRecommendationGraph', 'triggerRecommendation');

fixShallowReplaceRegex('src/components/movie-universe/MoviePoster.tsx', 'usePosterFocus', ['focusedPosterId', 'setFocusedPosterId']);
fixSingleRegex('src/components/movie-universe/MovieUniverse.tsx', 'usePosterFocus', 'focusedPosterId');
fixShallowReplaceRegex('src/components/movie-universe/PosterInfoPanel.tsx', 'usePosterFocus', ['focusedPosterId', 'setFocusedPosterId']);

