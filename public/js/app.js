angular.module('app', ['ngSanitize', 'chart.js'])

.controller('MainCtrl', ['$scope', '$sce', '$http', function($scope, $sce, $http) {
  $http.get('/api/alldata')
  .success(function(data, status, headers, config) {
    $scope.users = data.users;
    $scope.user_id = data.id;

  })
  .error(function(data, status, headers, config) {
    console.log(data);
  });
}])

.controller('ScoreCtrl', ['$scope', '$sce', '$http', function($scope, $sce, $http) {
  var idArray = location.href.split('/');
  var id = idArray[4];
  // console.log(id);
  $http.get('/api/applicants/'+id)
  .success(function(data, status, headers, config) {
    $scope.user = data
  })
  .error(function(data, status, header, config) {
    console.log(status);
  });


  $scope.JRsubmitScore = function() {
    var id = $scope.user.id;
    var cover_link_score = $scope.user.score.cover_link_score;
    var skill_score = $scope.user.score.skill_score;
    // console.log(skill_score);
    $http.get('/api/score/jr/'+id+'/'+cover_link_score+'/'+skill_score)
    .success(function(data, status, header, config) {
      alert('系統已記錄成績');
      window.location.href = '/'
    })
    .error(function(data, status, header, config){
      alert('有錯誤');
    });
  };

  $scope.SCsubmitScore = function() {
    var id = $scope.user.id;
    var youtube_link_score = $scope.user.score.youtube_link_score;
    $http.get('/api/score/sc/'+id+'/'+youtube_link_score)
    .success(function(data, status, header, config) {
      alert('系統已記錄成績');
      window.location.href = '/'
    })
    .error(function(data, status, header, config){
      alert('有錯誤');
    });
  }

  $scope.TMsubmitScore = function() {
    var id = $scope.user.id;
    var success_item_score = $scope.user.score.success_item_score;
    var fail_item_score = $scope.user.score.fail_item_score;
    $http.get('/api/score/tm/'+id+'/'+success_item_score+'/'+fail_item_score)
    .success(function(data, status, header, config) {
      alert('系統已記錄成績');
      window.location.href = '/'
    })
    .error(function(data, status, header, config){
      alert('有錯誤');
    });
  }
}])

.controller('DashBoardCtrl', ['$scope', '$sce', '$http', function($scope, $sce, $http) {
  $http.get('/api/alldata')
  .success(function(data, status, header, config) {
    $scope.users = data.users.map(function(user) {
      var obj = {};
      obj.id = user.id;
      obj.name = user.name;
      obj.student_id = user.student_id;
      obj.college = user.college;
      obj.department = user.department;
      obj.grade = user.grade;
      if (user.hasOwnProperty('gender')) {
        obj.gender = user.gender
      };
      obj.score = {};
      obj.score.total = 0;
      if (user.hasOwnProperty('score')) {
        if (user.score.hasOwnProperty('fail_item_score')) {
          obj.score.fail_item_score = parseInt(user.score.fail_item_score);
          obj.score.total += parseInt(user.score.fail_item_score);
        };
        if (user.score.hasOwnProperty('success_item_score')) {
          obj.score.success_item_score = parseInt(user.score.success_item_score);
          obj.score.total += parseInt(user.score.success_item_score);          
        };
        if (user.score.hasOwnProperty('youtube_link_score')) {
          obj.score.youtube_link_score = parseInt(user.score.youtube_link_score);
          obj.score.total += parseInt(user.score.youtube_link_score);          
        };
        if (user.score.hasOwnProperty('cover_link_score')) {
          obj.score.cover_link_score = parseInt(user.score.cover_link_score);
          obj.score.total += parseInt(user.score.cover_link_score);          
        };
        if (user.score.hasOwnProperty('skill_score')) {
          obj.score.skill_score = parseInt(user.score.skill_score);
          obj.score.total += parseInt(user.score.skill_score);          
        };
      };
      // console.log(obj.score.total);
      return obj;
    });
    // $scope.users = data;
    // console.log($scope.users);

    // peichart default data
    $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
    $scope.data = [300, 500, 100, 200, 300, 400, 500, 400, 500];

    $scope.chart_member = 80;

    $scope.updateChart = function() { 
      // default get first 80 students
      $scope.chart_data = $scope.users.sort(compare).slice(0,$scope.chart_member);
      // get first 80 student each college
      $scope.all_college = $scope.chart_data.map(function(obj) { return obj.college });
      $scope.all_gender = $scope.chart_data.map(function(obj) { return obj.gender });

      var temp = removeDuplicateAndCountAmount($scope.all_college); // return array of array
      var temp_gender = removeDuplicateAndCountAmount($scope.all_gender); // return array of array

      $scope.final_data = [];
      for (i = 0; i < temp[0].length; i++) {
        var obj = {};
        obj.label = temp[0][i];
        obj.data = temp[1][i];
        $scope.final_data.push(obj);
      }
      $scope.sorted_final_data = $scope.final_data.sort(compare2);
      $scope.labels = [];
      $scope.data = [];
      for (i = 0; i < $scope.sorted_final_data.length; i++) {
        $scope.labels.push($scope.sorted_final_data[i].label);
        $scope.data.push($scope.sorted_final_data[i].data);
      }

      $scope.final_data_gender = [];
      for (i = 0; i < temp_gender[0].length; i++) {
        var obj = {};
        obj.label = temp_gender[0][i];
        obj.data = temp_gender[1][i];
        $scope.final_data_gender.push(obj);
      }
      $scope.labels_gender = [];
      $scope.data_gender = [];
      for (i = 0; i < $scope.sorted_final_data.length; i++) {
        $scope.labels_gender.push($scope.final_data_gender[i].label);
        $scope.data_gender.push($scope.final_data_gender[i].data);
      }

    };
    // default get first 80 students
    $scope.chart_data = $scope.users.sort(compare).slice(0,$scope.chart_member);
    // get first 80 student each college
    $scope.all_college = $scope.chart_data.map(function(obj) { return obj.college });
    $scope.all_gender = $scope.chart_data.map(function(obj) { return obj.gender });

    var temp = removeDuplicateAndCountAmount($scope.all_college); // return array of array
    var temp_gender = removeDuplicateAndCountAmount($scope.all_gender); // return array of array

    $scope.final_data = [];
    for (i = 0; i < temp[0].length; i++) {
      var obj = {};
      obj.label = temp[0][i];
      obj.data = temp[1][i];
      $scope.final_data.push(obj);
    }
    $scope.sorted_final_data = $scope.final_data.sort(compare2);
    $scope.labels = [];
    $scope.data = [];
    for (i = 0; i < $scope.sorted_final_data.length; i++) {
      $scope.labels.push($scope.sorted_final_data[i].label);
      $scope.data.push($scope.sorted_final_data[i].data);
    }

    $scope.final_data_gender = [];
    for (i = 0; i < temp_gender[0].length; i++) {
      var obj = {};
      obj.label = temp_gender[0][i];
      obj.data = temp_gender[1][i];
      $scope.final_data_gender.push(obj);
    }
    $scope.labels_gender = [];
    $scope.data_gender = [];
    for (i = 0; i < $scope.sorted_final_data.length; i++) {
      $scope.labels_gender.push($scope.final_data_gender[i].label);
      $scope.data_gender.push($scope.final_data_gender[i].data);
    }
  })
  .error(function(data, status, header, config) {
    console.log(data);
    window.location.href = '/';
  });

  $scope.predicate = 'id';



}])


function getYoutubeID(original_URL) {
  var temp = original_URL.split('=');
  return temp[1];
}

function changetoHTML() {
  $('skill-frame').text()
}

function compare(a,b) {
  if (a.score.total < b.score.total)
    return 1;
  if (a.score.total > b.score.total)
    return -1;
  return 0;
}
function compare2(a,b) {
  if (a.data < b.data)
    return 1;
  if (a.data > b.data)
    return -1;
  return 0;
}
function eliminateDuplicates(arr) {
  var i,
      len=arr.length,
      out=[],
      obj={};

  for (i=0;i<len;i++) {
    obj[arr[i]]=0;
  }
  for (i in obj) {
    out.push(i);
  }
  return out;
}
function removeDuplicateAndCountAmount(arr) {
    var a = [], b = [], prev;

    arr.sort();
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {
            a.push(arr[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = arr[i];
    }

    return [a, b];
}