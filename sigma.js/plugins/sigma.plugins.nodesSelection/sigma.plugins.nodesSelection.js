(function() {
'use strict';

	if (typeof sigma === 'undefined')
		throw 'sigma is not declared';

	sigma.utils.pkg('sigma.plugins');

	var startPosition;
	var WIDTH;
	var HEIGHT;
	var ctx;
	var gCanvas;
	var eCanvas; //edges
	var graph;
	var callback;
	var callback2;

	function mousedown(e){
		startPosition={x:e.layerX, y:e.layerY};
		gCanvas.addEventListener('mousemove',mousemove);
	
		
	}
	

	function mouseup(e){
		gCanvas.removeEventListener('mousemove',mousemove);
		gCanvas.removeEventListener('mousedown',mousedown);
		gCanvas.removeEventListener('mouseup',mouseup);
		clear(ctx);
		graph.settings('mouseEnabled', true);

		callback(null, getNodesInArea(startPosition.x, startPosition.y, e.layerX, e.layerY));
		//callback2(null, getEdgesInArea(startPosition.x, startPosition.y, e.layerX, e.layerY));
		//callback for edges in area
	}
	function edgeMouseUp(e){
		gCanvas.removeEventListener('mousemove',mousemove);
		gCanvas.removeEventListener('mousedown',mousedown);
		gCanvas.removeEventListener('mouseup',edgeMouseUp);
		clear(ctx);
		graph.settings('mouseEnabled', true);
		
		//callback(null, getNodesInArea(startPosition.x, startPosition.y, e.layerX, e.layerY));
		callback2(null, getEdgesInArea(startPosition.x, startPosition.y, e.layerX, e.layerY));
		//callback for edges in area
		
	}
	
	function getNodesInArea(x1, y1, x2, y2){
		var nodesInArea = [];
		
		var startX;
		var endX;
		var startY;
		var endY;

		if (x1 > x2){
			startX = x2;
			endX = x1;
		}else{
			startX = x1;
			endX = x2;
		}

		if (y1 > y2){
			startY = y2;
			endY = y1;
		}else{
			startY = y1;
			endY = y2;
		}
		
		graph.camera.quadtree._cache.result.forEach(function(node){
			var nodeX = node['renderer1:x'];
			var nodeY = node['renderer1:y'];
			if ((nodeX > startX) && (nodeX < endX) && 
							(nodeY > startY) && (nodeY < endY)){
				nodesInArea.push(node);
			}
		});
		/*
			Hypothetically this didn't bring up any errors, so it could possibly work.  Will need to work on it more later.  
		
		if (edges.length > 0)
		{
		graph.camera.quadtree._cache.result.forEach(function(edge){
		for (var i = 0, l = edges.length; i < l; i++) {
			source = s.graph.nodes(edges[i].source);
			target = s.graph.nodes(edges[i].target);
			edgeX1 = source['renderer1:x'],
			edgeY1 = source['renderer1:y'],
			edgeX2 = target['renderer1:x'],
			edgeY2 = target['renderer1:y'];
			
			if ((edgeX1 > startX) && (edgeX1 < endX) && 
							(edgeY1 > startY) && (edgeY1 < endY) &&
								(edgeX2 > startX) && (edgeX2 < endX) && 
									(edgeY2 > startY) && (edgeY2 < endY)){
				edgesInArea.push(edge);
			}
		}
		});
		}		*/
		return nodesInArea;
	//	return nodesInArea, edgesInArea;
	}
	
	function getEdgesInArea(x1, y1, x2, y2){
		var edgesInArea = [];
		var source;
		var target;
		var edgeX1, edgeX2, edgeY1, edgeY2;
		var startX;
		var endX;
		var startY;
		var endY;

		if (x1 > x2){
			startX = x2;
			endX = x1;
		}else{
			startX = x1;
			endX = x2;
		}

		if (y1 > y2){
			startY = y2;
			endY = y1;
		}else{
			startY = y1;
			endY = y2;
		}
		/*
		graph.camera.quadtree._cache.result.forEach(function(node){
			var nodeX = node['renderer1:x'];
			var nodeY = node['renderer1:y'];
			if ((nodeX > startX) && (nodeX < endX) && 
							(nodeY > startY) && (nodeY < endY)){
				nodesInArea.push(node);
			}
		}); */
		/*
			Hypothetically this didn't bring up any errors, so it could possibly work.  Will need to work on it more later.  
		
		*/
		graph.camera.quadtree._cache.result.forEach(function(edge){
		for (var i = 0; /*l = edges.length;*/ i < edges.length; i++) {
			source = s.graph.nodes(edges[i].source);
			target = s.graph.nodes(edges[i].target);
			edgeX1 = source['renderer1:x'],
			edgeY1 = source['renderer1:y'],
			edgeX2 = target['renderer1:x'],
			edgeY2 = target['renderer1:y'];
			
			if ((edgeX1 > startX) && (edgeX1 < endX) && 
							(edgeY1 > startY) && (edgeY1 < endY) &&
								(edgeX2 > startX) && (edgeX2 < endX) && 
									(edgeY2 > startY) && (edgeY2 < endY)&& edgesInArea.indexOf(edges[i]) == -1) {
				edgesInArea.push(edges[i]);
			}
		}
		});
				
		if(edgesInArea !== 'undefined')
		{
		return edgesInArea;
		}
		
	} 
	/*
		The entire following area would be me attempting to add edges to this plugin.  
		for (var i = 0, l = edges.length; i < l; i++) {
      source = graph.nodes(edges[i].source);
      target = graph.nodes(edges[i].target);
      e = {
        x1: source[prefix + 'x'],
        y1: source[prefix + 'y'],
        x2: target[prefix + 'x'],
        y2: target[prefix + 'y'],
        size: edges[i][prefix + 'size'] || 0
      };
	*/
	/*function getEdgesInArea(x1, y1, x2, y2){
		var edgesInArea = [];
		var startX;
		var endX;
		var startY;
		var endY;

		if (x1 > x2){
			startX = x2;
			endX = x1;
		}else{
			startX = x1;
			endX = x2;
		}

		if (y1 > y2){
			startY = y2;
			endY = y1;
		}else{
			startY = y1;
			endY = y2;
		}
		
		graph.camera.quadtree._cache.result.forEach(function(edge){
			var edgeX = node['renderer1:x'];
			var edgeY = node['renderer1:y'];
			if ((edgeX > startX) && (edgeX < endX) && 
							(edgeY > startY) && (edgeY < endY)){
				edgesInArea.push(edge);
			}
			
			
		});
			return edgesInArea;
		*/
	
	/*
		End of area
	*/
	function mousemove(e){
		clear(ctx);
		ctx.beginPath();
	//	ctx.lineWidth='1';
	//	ctx.setLineDash([6]);
		ctx.strokeStyle='black';
		ctx.rect(startPosition.x, startPosition.y, e.layerX - startPosition.x, e.layerY - startPosition.y); 
		ctx.stroke();
	}
	

	
	sigma.plugins.activateMouseEvents = function(s, cb) {
		if (!s){
			cb('graph not supplied');
		}else{
			var renderer = s.renderers[0];
			var container = renderer.container;
			graph = s;
			callback = cb;
			callback2 = cb;
			graph.settings('mouseEnabled', false);
			gCanvas = container.lastChild;
			eCanvas = container.lastChild;
			HEIGHT = gCanvas.height;
	  		WIDTH = gCanvas.width;
			ctx = gCanvas.getContext('2d');
			gCanvas.addEventListener('mousedown',mousedown);
			gCanvas.addEventListener('mouseup',mouseup);
			if(edges.length > 0)
			{
				
			gCanvas.addEventListener('mouseup',edgeMouseUp);
			
			}
		
		}
	};
	/*
	sigma.plugins.activateMouseEventsEdge = function(s, cb) {
		if (!s){
			cb('graph not supplied');
		}else{
			var renderer = s.renderers[0];
			var container = renderer.container;
			graph = s;
			callback2 = cb;
			graph.settings('mouseEnabled', false);
			gCanvas = container.lastChild;
			eCanvas = container.lastChild;
			HEIGHT = gCanvas.height;
	  		WIDTH = gCanvas.width;
			ctx = gCanvas.getContext('2d');
			gCanvas.addEventListener('mousedown',mousedown);
			gCanvas.addEventListener('mouseup',mouseup);
			gCanvas.addEventListener('mouseup',edgeMouseUp);
		
		}
	};
	*/
	function clear(c) {
		c.clearRect(0, 0, WIDTH, HEIGHT);
	}
}).call(window);