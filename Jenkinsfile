node {
   stage('Preparation') {
   checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [[$class: 'RelativeTargetDirectory', relativeTargetDir: 'jenkinsTesting/']], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'n1', url: 'https://github.com/tph5595/ramHacks-2016.git']]])
      step([$class: 'GitHubSetCommitStatusBuilder'])
      sh "rm App/*.class"
   }
   stage('Build') {
      sh "javac App/*.java"
      sh "java App/main.class"
   }
   stage('Results') {
      step([$class: 'Mailer', notifyEveryUnstableBuild: true, recipients: 'tph5595@verizon.net', sendToIndividuals: true])
      step([$class: 'WsCleanup'])P
   }
}
