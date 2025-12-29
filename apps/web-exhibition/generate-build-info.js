#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Get git information
function getGitInfo() {
  try {
    const commitHash = execSync("git rev-parse HEAD", {
      encoding: "utf8",
    }).trim();
    const commitShort = execSync("git rev-parse --short HEAD", {
      encoding: "utf8",
    }).trim();
    const commitMessage = execSync("git log -1 --pretty=%B", {
      encoding: "utf8",
    }).trim();
    const branchName = execSync("git rev-parse --abbrev-ref HEAD", {
      encoding: "utf8",
    }).trim();
    const remoteUrl = execSync("git config --get remote.origin.url", {
      encoding: "utf8",
    }).trim();

    // Extract GitLab URL (assuming it's a GitLab repo)
    let gitlabUrl = null;
    if (remoteUrl) {
      // Handle both SSH and HTTPS URLs
      const sshMatch = remoteUrl.match(/git@([^:]+):(.+)\.git$/);
      const httpsMatch = remoteUrl.match(/https?:\/\/([^/]+)\/(.+)\.git$/);

      if (sshMatch) {
        const [, host, repo] = sshMatch;
        gitlabUrl = `https://${host}/${repo}`;
      } else if (httpsMatch) {
        const [, host, repo] = httpsMatch;
        gitlabUrl = `https://${host}/${repo}`;
      }
    }

    return {
      commitHash,
      commitShort,
      commitMessage: commitMessage.split("\n")[0], // First line only
      branchName,
      gitlabUrl,
    };
  } catch (error) {
    console.warn("⚠️  Could not get git information:", error.message);
    return {
      commitHash: null,
      commitShort: null,
      commitMessage: null,
      branchName: null,
      gitlabUrl: null,
    };
  }
}

const gitInfo = getGitInfo();

// Generate build info
const buildInfo = {
  timestamp: new Date().toISOString(),
  date: new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  }),
  version: process.env.npm_package_version || "0.1.0",
  nodeVersion: process.version,
  buildId: Math.random().toString(36).substring(2, 15),
  git: gitInfo,
};

// Write build info to file
const buildInfoPath = path.join(__dirname, "lib", "build-info.ts");
const buildInfoContent = `// Build information generated at build time
// This file is auto-generated during the build process

export interface BuildInfo {
  timestamp: string;
  date: string;
  version: string;
  nodeVersion: string;
  buildId: string;
  git: {
    commitHash: string | null;
    commitShort: string | null;
    commitMessage: string | null;
    branchName: string | null;
    gitlabUrl: string | null;
  };
}

const buildInfo: BuildInfo = ${JSON.stringify(buildInfo, null, 2)};

export default buildInfo;
`;

fs.writeFileSync(buildInfoPath, buildInfoContent);
console.log(`✅ Build info generated: ${buildInfoPath}`);
console.log(`📅 Build time: ${buildInfo.date}`);
console.log(`🆔 Build ID: ${buildInfo.buildId}`);
if (gitInfo.commitShort) {
  console.log(`🔗 Git commit: ${gitInfo.commitShort} (${gitInfo.branchName})`);
  console.log(`💬 Commit message: ${gitInfo.commitMessage}`);
  if (gitInfo.gitlabUrl) {
    console.log(
      `🦊 GitLab URL: ${gitInfo.gitlabUrl}/-/commit/${gitInfo.commitHash}`
    );
  }
}
