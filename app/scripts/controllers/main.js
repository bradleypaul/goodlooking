'use strict';

/**
 * @ngdoc function
 * @name goodlookingApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the goodlookingApp
 */
angular.module('goodlookingApp')
  .controller('MainCtrl', ['$scope', function ($scope) {

    $scope.patients = [{
        "name": "John Doe",
        "prov": "A",
        "idnum": "123",
        "mr": "xyz",
        "insurance": "BCBS",
        "address": "10300 Metric Blvd Ste 300",
        "city": "Austin",
        "st": "TX",
        "phone": "(123)456-7890",
        "dob": "1991-09-14",
        "admit": "1992-09-14",
        "dc": "1993-09-14"
      },
      {
        "name": "Jane Doe",
        "prov": "A",
        "idnum": "456",
        "mr": "xyz",
        "insurance": "ABC",
        "address": "123 Some Fake St",
        "city": "Happy",
        "st": "TX",
        "phone": "(234)567-8901",
        "dob": "1991-09-16",
        "admit": "1992-09-16",
        "dc": "1993-09-16"
      },
      {
        "name": "All Might",
        "prov": "B",
        "idnum": "789",
        "mr": "xyz",
        "insurance": "ABC",
        "address": "6325 Happy Go Lucky Blvd",
        "city": "Kilgore",
        "st": "TN",
        "phone": "(345)678-9012",
        "dob": "1991-09-18",
        "admit": "1992-09-18",
        "dc": "1993-09-18"
      },
      {
        "name": "Oscar Dog",
        "prov": "C",
        "idnum": "012",
        "mr": "xyz",
        "insurance": "MDCP",
        "address": "1 Blah Blah Blah Rd",
        "city": "Happy",
        "st": "TX",
        "phone": "(456)789-0123",
        "dob": "1991-09-20",
        "admit": "1992-09-20",
        "dc": "1993-09-20"
      },
      {
        "name": "Happy Gilmore",
        "prov": "D",
        "idnum": "345",
        "mr": "xyz",
        "insurance": "MED",
        "address": "1 Infinite Loop",
        "city": "Cupertino",
        "st": "CA",
        "phone": "(567)890-1234",
        "dob": "1991-09-22",
        "admit": "1992-09-22",
        "dc": "1993-09-22"
      }
    ];

    function resetParams () {
      $scope.params = {};
      $scope.params.order = "asc";
    }

    // Deep copy all patients for resetting table
    // According to forums I have read in the past, this is the fastest way
    // in the V8 engine.
    $scope.allPatients = JSON.parse(JSON.stringify($scope.patients));

    $scope.options = Object.keys($scope.patients[0]);
    resetParams();

    $scope.toggleShow = function () {
      $scope.showAdvanced = !$scope.showAdvanced;
    };

    $scope.reset = function () {
      resetParams();
    };

    $scope.search = function () {
      
      if($scope.allPatients.length !== $scope.patients.length) {
        resetPatients();
      }

      let isDescending = $scope.params.order === 'desc';
      $scope.patients = filterPatients($scope.patients, $scope.params.columns);
      
      if($scope.params.orderBy) {
        $scope.patients = sortPatients($scope.patients, $scope.params.orderBy.toLowerCase(), isDescending);
      }

      $scope.patients = limitPatients($scope.patients, $scope.params.limit);
      $scope.toggleShow();
    };

    function resetPatients() {
      $scope.patients = $scope.allPatients;
    }

    function filterPatients(patients, filterParams) {
      return patients.filter(patient => {
        for (let x in filterParams) {
          if (filterParams[x] && filterParams[x].toUpperCase() !== patient[x].toUpperCase()) {
            return false;
          }
        }
        return true;
      });
    }

    function sortPatients(patients, criteria, isDescending) {
      if (criteria) {
        patients = patients.sort((a, b) => {
          let A = a[criteria];
          let B = b[criteria];
          if (A < B) {
            return -1; 
          } else if (B < A) {
            return 1;
          } else {
            return 0;
          }
        });

        if (isDescending) {
          patients = patients.reverse();
        }
      }

      return patients;
    }

    function limitPatients(patients, limit) {
      if(limit) {
        patients = patients.slice(0, limit);
      }
      return patients;
    }
  }]);
