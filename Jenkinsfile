node {
   stage('Preparation') {
      sh "rm App/*.class"
   }
   stage('Build') {
      sh "javac App/*.java"
   }
   stage('Results') {
     mail bcc: '', body: 'ramHacks-2016 failed to pass the Jenkins test! Please go to the repo at https://github.com/tph5595/ramHacks-2016.git to resolve to issue', cc: '', from: '', replyTo: '', subject: 'BUILD FAIL', to: 'tph5595@verizon.net'
   }
}
