node {
   stage('Preparation') {
      echo 'Pulling latest code'
      checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [[$class: 'RelativeTargetDirectory', relativeTargetDir: 'jenkinsTesting/']], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'n1', url: 'https://github.com/tph5595/ramHacks-2016.git']]])
      echo 'changing status to pending'
      step([$class: 'GitHubSetCommitStatusBuilder'])
      echo 'deleting old executables'
      if (isUnix()) {
         sh "rm App/*.class"
      }else{
         bat "del App/*.class"
      }
   }
   stage('Build') {
      if (isUnix()) {
         sh "javac App/*.java"
         echo 'Successful compile'
         sh "java App/main.class"
         echo 'Successful run'
      }else{
         bat "javac App/*.java"
         echo 'Successful compile'
         bat "java App/main.class"
         echo 'Successful run'
      }
   }
   stage('Results') {
      step([$class: 'Mailer', notifyEveryUnstableBuild: true, recipients: 'tph5595@verizon.net', sendToIndividuals: true])
      echo 'Cleaning up'
      step([$class: 'WsCleanup'])P
   }
}
