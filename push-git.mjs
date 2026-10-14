import fs from 'fs';
import git from 'isomorphic-git';
import http from 'isomorphic-git/http/node';

const dir = 'C:\\Users\\DELL\\Downloads\\NIAT\\smart-traffic-manager';
const url = 'https://github.com/phani-12330/phani1.git';

async function push() {
  console.log('Pushing to remote:', url);

  const token = process.argv[2] || process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '';
  if (!token) {
    console.error('Error: Please provide a GitHub Personal Access Token (PAT). Usage: node push-git.mjs <your-github-token>');
    process.exit(1);
  }

  const pushResult = await git.push({
    fs,
    http,
    dir,
    remote: 'origin',
    url: url,
    ref: 'main',
    onAuth: () => ({
      username: 'phani-12330',
      password: token
    })
  });

  console.log('Push result:', pushResult);
}

push().catch(err => {
  console.error('Push error:', err.message || err);
  process.exit(1);
});
