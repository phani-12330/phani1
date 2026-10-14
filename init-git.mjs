import fs from 'fs';
import path from 'path';
import git from 'isomorphic-git';
import http from 'isomorphic-git/http/node';

const dir = 'C:\\Users\\DELL\\Downloads\\NIAT\\smart-traffic-manager';

async function initAndCommit() {
  console.log('Initializing Git repo at:', dir);
  await git.init({ fs, dir, defaultBranch: 'main' });

  // Read all files except node_modules, dist, .git
  function getFiles(base, current = '') {
    const full = path.join(base, current);
    const entries = fs.readdirSync(full, { withFileTypes: true });
    let files = [];
    for (const ent of entries) {
      const rel = current ? `${current}/${ent.name}` : ent.name;
      if (ent.name === 'node_modules' || ent.name === 'dist' || ent.name === '.git') continue;
      if (ent.isDirectory()) {
        files = files.concat(getFiles(base, rel));
      } else {
        files.push(rel);
      }
    }
    return files;
  }

  const allFiles = getFiles(dir);
  console.log(`Adding ${allFiles.length} files to Git...`);

  for (const f of allFiles) {
    await git.add({ fs, dir, filepath: f });
  }

  console.log('Committing changes...');
  const sha = await git.commit({
    fs,
    dir,
    author: {
      name: 'phani-12330',
      email: 'phani@users.noreply.github.com'
    },
    message: 'Initial commit: SMART TRAFFIC MANAGER — AI-Powered Intelligent Traffic Control System'
  });

  console.log('Commit successfully created! SHA:', sha);
}

initAndCommit().catch(err => {
  console.error('Git error:', err);
  process.exit(1);
});
