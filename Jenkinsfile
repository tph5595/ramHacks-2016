node {
   stage('Preparation') {
      step([$class: 'Mailer', notifyEveryUnstableBuild: true, recipients: 'tph5595@verizon.net', sendToIndividuals: true])
      echo 'Pulling latest code'
      checkout scm
      echo 'changing status to pending'
      //step([$class: 'GitHubSetCommitStatusBuilder'])
   }
   stage('Build') {
      if (isUnix()) {
          echo pwd()
          sh "python App/test.py"
          sh "zip -r App/spaceGeek/src/master App/spaceGeek/src/*.js"
          sh "rm -rf [App/spaceGeek/src/*.zip"
          sh "zip -r App/spaceGeek/src/master App/spaceGeek/src/*"
          sh "javac src/*.java"
          dir('src/'){
          //  sh "./gen.sh"
          }
          sh "docker rm ${docker ps -a -q}"
          sh "docker rmi ${docker images -q}"
          dir('Docker/'){
            sh "docker build ."
          }
          dir('Cal/'){
            sh "node server.js"
            sh "python "
          }
      }else{
         echo 'Please run on Unix for full test cases'
      }
   }
   stage('Results') {
      echo 'Cleaning up'
      step([$class: 'WsCleanup'])
   }
}
