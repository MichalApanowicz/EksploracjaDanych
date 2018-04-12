var app = angular.module("program2", []);

app.controller("ctrl", function($scope) {
    $scope.k = 0;
	$scope.matrix = [];
	
	$scope.classCountChange = function(n) {
		$scope.matrix = [];
		var row = [];
		for(var i=0; i<n; i++){
			for(var j=0; j<n; j++){
				row.push({key: {x: i, y: j}, value: 0})
			}	
			$scope.matrix.push(row);
			row = [];
		}
	};
	
	$scope.round = function Round(n, k)	{
		var factor = Math.pow(10, k);
		return Math.round(n*factor)/factor;
	}
	
	
	$scope.sumColumn = function(i) {
		var m = $scope.matrix;
		var sum = 0;	
		m.forEach(function(row){
			row.forEach(function(item){
				if(item.key.x===i) sum+=item.value;
			})
		});
		return sum;
	}
	
	$scope.sumRow = function(i) {
		var m = $scope.matrix;
		var sum = 0;
		m.forEach(function(row){
			row.forEach(function(item){
				if(item.key.y===i) sum+=item.value;
			})
		});
		return sum;
	}
	
	$scope.obliczWspolczynniki = function(i) {
		var result = {TP:0, TN:0, FP:0, FN:0, N:0};
		var m = $scope.matrix;
		m.forEach(function(row){
			row.forEach(function(item){
				if(i == item.key.y || i == item.key.x) {
					if(i == item.key.y && i == item.key.x) result.TP += item.value;
					else if(item.key.y == i) result.FN += item.value;
					else if(item.key.x == i) result.FP += item.value;
				}
				else result.TN += item.value;
				result.N += item.value;
			})
		});
		return result;
	}
	
	$scope.trafnoscOgolna = function() {
		var m = $scope.matrix;
		var TP = 0;
		var N = 0;
		m.forEach(function(row){
			row.forEach(function(item){
				if(item.key.y===item.key.x) TP+=item.value;
				N+=item.value;
			})
		});
		return TP/N;
	}
	
	$scope.trafnoscKlasy = function(i) {
		var r = $scope.obliczWspolczynniki(i);

		var result = (r.TP + r.TN)/r.N;
		return result > -1 ? $scope.round(result, 4) : "-";
	}
	
	$scope.calkowityWspolczynnikBleduKlasy = function(i) {
		var r = $scope.obliczWspolczynniki(i);

		var result = (r.FN + r.FP)/r.N;
		return result > -1 ? $scope.round(result, 4) : "-";
	}
	
	$scope.wskaznikFN = function(i) {
		var r = $scope.obliczWspolczynniki(i);

		var result = r.FN/(r.FN+r.TN);
		return result > -1 ? $scope.round(result, 4) : "-";
	}
	
	$scope.wskaznikFP = function(i) {
		var r = $scope.obliczWspolczynniki(i);

		var result = r.FP/(r.FP+r.TP);
		return result > -1 ? $scope.round(result, 4) : "-";
	}
	
	
	$scope.czulosc = function(i) {
		var r = $scope.obliczWspolczynniki(i);

		var result = r.TP/(r.TP+r.FN);
		return result > -1 ? $scope.round(result, 4) : "-";
	}
	
	$scope.swoistosc = function(i) {
		var r = $scope.obliczWspolczynniki(i);

		var result = r.TN/(r.TN+r.FP);
		return result > -1 ? $scope.round(result, 4) : "-";
	}
	
	$scope.PPV = function(i) {
		var r = $scope.obliczWspolczynniki(i);

		var result = r.TP/(r.TP+r.FP);
		return result > -1 ? $scope.round(result, 4) : "-";
	}
	
	$scope.NPV = function(i) {
		var r = $scope.obliczWspolczynniki(i);

		var result = r.TN/(r.TN+r.FN);
		return result > -1 ? $scope.round(result, 4) : "-";
	}
	
	$scope.FDR = function(i) {
		var r = $scope.obliczWspolczynniki(i);

		var result = r.FP/(r.FP+r.TP);
		return result > -1 ? $scope.round(result, 4) : "-";
	}
	
	$scope.FOR = function(i) {
		var r = $scope.obliczWspolczynniki(i);

		var result = r.FN/(r.FN+r.TN);
		return result > -1 ? $scope.round(result, 4) : "-";
	}
});