;(function() {
  'use strict';

  sigma.utils.pkg('sigma.canvas.edges');

  /**
   * This edge renderer will display edges as curves with arrow heading.
   *
   * @param  {object}                   edge         The edge object.
   * @param  {object}                   source node  The edge source node.
   * @param  {object}                   target node  The edge target node.
   * @param  {CanvasRenderingContext2D} context      The canvas context.
   * @param  {configurable}             settings     The settings function.
   */

sigma.canvas.edges.t = function(edge, source, target, context, settings) {
  var color = edge.color,
      prefix = settings('prefix') || '',
      size = edge[prefix + 'size'] || 1,
      edgeColor = settings('edgeColor'),
      defaultNodeColor = settings('defaultNodeColor'),
      defaultEdgeColor = settings('defaultEdgeColor');

    
  if (!color)
    switch (edgeColor) {
      case 'source':
        color = source.color || defaultNodeColor;
        break;
      case 'target':
        color = target.color || defaultNodeColor;
        break;
      default:
        color = defaultEdgeColor;
        break;
    }

  context.strokeStyle = color;
  context.lineWidth = edge[prefix + 'size'] || 1;
  context.beginPath();
  context.moveTo(
    source[prefix + 'x'],
    source[prefix + 'y']
  );
  context.lineTo(
    source[prefix + 'x'],
    target[prefix + 'y']
  );
  context.lineTo(
    target[prefix + 'x'],
    target[prefix + 'y']
  );
  context.stroke();
};