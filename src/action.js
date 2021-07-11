const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
    const message = core.getInput('message');

    const { context = {} } = github;
    const { pull_request } = context.payload;

    console.log('Pull Request #${pull_request.number}');

    const octokit = github.getOctokit(GITHUB_TOKEN);

    await octokit.issues.createComment({
      ...context.repo,
      issue_number: pull_request.number,
      body: `${message}`
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
