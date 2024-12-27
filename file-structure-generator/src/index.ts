import { Project, StructureKind } from 'ts-morph';
import path from 'path';
import minimist from 'minimist';
import fs from 'fs';

const project = new Project();

const createModule = (moduleName: string) => {
  const modulePath = path.join('src', moduleName);
  const uiPath = path.join(modulePath, 'ui');
  const modelPath = path.join(modulePath, 'model');

  // Ensure directories exist
  [modulePath, uiPath, modelPath].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  // Create index.ts
  const indexFile = project.createSourceFile(
    path.join(modulePath, 'index.ts'),
    {
      statements: [
        {
          kind: StructureKind.ExportDeclaration,
          moduleSpecifier: './ui',
        },
        {
          kind: StructureKind.ExportDeclaration,
          moduleSpecifier: './model',
        }
      ]
    }
  );

  indexFile.saveSync();

  // Create a sample UI component
  const uiFile = project.createSourceFile(
    path.join(uiPath, `${moduleName}Component.tsx`),
    {
      statements: [
        {
          kind: StructureKind.Function,
          name: `${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Component`,
          isExported: true,
          statements: 'return <div>Hello from UI Component</div>;',
          returnType: 'JSX.Element'
        }
      ]
    }
  );

  uiFile.saveSync();

  // Create a sample model file
  const modelFile = project.createSourceFile(
    path.join(modelPath, `${moduleName}Model.ts`),
    {
      statements: [
        {
          kind: StructureKind.Interface,
          name: `${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Model`,
          isExported: true,
          properties: [{ name: 'id', type: 'string' }, { name: 'name', type: 'string' }]
        }
      ]
    }
  );

  modelFile.saveSync();
};

const args = minimist(process.argv.slice(2));
const moduleName = args.module || 'defaultModule';

createModule(moduleName);
console.log(`Module '${moduleName}' generated successfully.`);
