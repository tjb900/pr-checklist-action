import * as core from '@actions/core'
import {context, getOctokit} from '@actions/github'

async function run(): Promise<void> {
  try {
    const token: string = core.getInput('github-token')
    const github = getOctokit(token)

    const text: string = core.getInput('text')

    await github.issues.createComment({
      issue_number: context.issue.number,
      owner: context.repo.owner,
      repo: context.repo.repo,
      body: text
    })

    core.debug("got here")
    core.setOutput('result', "OK")
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
