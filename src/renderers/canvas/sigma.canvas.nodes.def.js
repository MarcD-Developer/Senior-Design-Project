 ;(function() {
  'use strict';

  sigma.utils.pkg('sigma.canvas.nodes');

  /**
   * The default node renderer. It renders the node as a simple disc.
   *
   * @param  {object}                   node     The node object.
   * @param  {CanvasRenderingContext2D} context  The canvas context.
   * @param  {configurable}             settings The settings function.
   */
  sigma.canvas.nodes.def = function(node, context, settings) {
    var prefix = settings('prefix') || '';

    context.fillStyle = node.color || settings('defaultNodeColor');
	//adding opacity
	context.globalAlpha = node.opacity || 1;
    context.beginPath();
    context.arc(
      node[prefix + 'x'],
      node[prefix + 'y'],
      node[prefix + 'size'],
      0,
      Math.PI * 2,
      true
    );
	
    context.closePath();
    context.fill();
	
	/*
	context.beginPath();
	context.arc(
	  node[prefix + 'x'],
      node[prefix + 'y'],
      node[prefix + 'size'] + 2,
      0,
      Math.PI * 2,
      true
	);
	*/
	//context.stroke();
	// Adding a border
	context.lineWidth = node.borderWidth || 2;
	context.strokeStyle = node.borderColor || '#000';
  	context.stroke();
	
  /*	context.lineWidth = node.borderWidth || 4;
  	context.strokeStyle = node.borderColor || '#fff';//'#3369E8';
	
	//context.closePath(); 
	//context.globalAlpha = node.borderOpacity || 0;
  	context.stroke();
	context.lineWidth = 2;
	context.strokeStyle = node.outerBorderColor || '#666';
	context.stroke();
	context.closePath();
	*/
	
  };
})();
