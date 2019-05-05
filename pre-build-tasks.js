const gulp = require('gulp');
const fs = require('fs');
let angularConfig = require('./angular.json');

gulp.task('default', function () {

  // The environment name will be will be set by Jenkins.
  // the declaration and initialisation is different on purpose.
  let envName = 'dev_azure';

  let metaBuildData = {
    envName: envName,
    containerName: 'devtest',
    appName: 'srkpure'
  };

  // Throw build if Environment is Unknown.
  if (envName.toLowerCase() === 'env_name') {

    throw new Error("Unable to determine environment. Please check Jenkins config and ensure that Jenkins will replace envName variable properly.")

  } else {

    angularConfig.projects['control-center']['architect']['build']['options'].deployUrl = `https://pck2.azureedge.net/${metaBuildData.containerName}/${metaBuildData.appName}/${metaBuildData.envName}/`;
    angularConfig.cli = metaBuildData;

    fs.writeFileSync('angular.json', JSON.stringify(angularConfig, null, 4));

  }

});
