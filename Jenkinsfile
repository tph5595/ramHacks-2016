node {
   stage('Preparation') {
      step([$class: 'Mailer', notifyEveryUnstableBuild: true, recipients: 'tph5595@verizon.net', sendToIndividuals: true])
      echo 'Pulling latest code'
      checkout scm
      echo 'changing status to pending'
      step([$class: 'GitHubSetCommitStatusBuilder'])
   }
   stage('Build') {
      if (isUnix()) {
        echo pwd()
        //dir ('/Users/taylor/ramHacks-2016/'){
          sh "python App/test.py"
          sh "zip -r App/spaceGeek/src/master App/spaceGeek/src/*.js"
          sh "rm -rf [App/spaceGeek/src/*.zip"
          sh "zip -r App/spaceGeek/src/master App/spaceGeek/src/*"
          sh "./src/gen.sh"
        //}
      }else{
         echo 'Please run on Unix for full test cases'
      }
   }
   stage('Results') {
      echo 'Cleaning up'
      step([$class: 'WsCleanup'])
   }
}
