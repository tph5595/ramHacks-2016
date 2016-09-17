node {
   stage('Preparation') {
      step([$class: 'GitHubSetCommitStatusBuilder'])
      sh "rm App/*.class"
   }
   stage('Build') {
      sh "javac App/*.java"
      sh "java App/main.class"
   }
   stage('Results') {
      step([$class: 'Mailer', notifyEveryUnstableBuild: true, recipients: 'tph5595@verizon.net', sendToIndividuals: true])
      step([$class: 'WsCleanup'])
   }
}
