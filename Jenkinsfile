node {
   stage('Preparation') {
      step([$class: 'Mailer', notifyEveryUnstableBuild: true, recipients: 'tph5595@verizon.net', sendToIndividuals: true])
      echo 'Pulling latest code'
      //checkout scm
      echo 'changing status to pending'
      step([$class: 'GitHubSetCommitStatusBuilder'])
      echo 'deleting old executables'
    /*  if (isUnix()) {
         sh "rm App/*.class"
      }else{*/
        // bat "del App/*.class"/*
      //}*/
   }
   stage('Build') {
      if (isUnix()) {
        //echo pwd()
        dir ('/Users/taylor/ramHacks-2016/'){
          sh "python App/test.py"
          sh "zip -r App/SpaceGeek/master App/spaceGeek/src/*"
        //  if((fileExists 'App/spaceGeek/*.zip')){
            sh "rm App/spaceGeek/src/*.zip"
        //  }
          sh "zip -r App/SpaceGeek/master App/spaceGeek/src/*"
        }
      /*   sh "javac App/*.java"
         echo 'Successful compile'
         sh "java App/main.class"
         echo 'Successful run'*/
         }//else{
        /* bat "javac App/*.java"
         echo 'Successful compile'
         bat "java App/main.class"
         echo 'Successful run'*/
      //}
   }
   stage('Results') {

      echo 'Cleaning up'
      step([$class: 'WsCleanup'])
   }
}
