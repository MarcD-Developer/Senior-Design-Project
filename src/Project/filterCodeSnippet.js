function updatePane(graph, filter)
{
	var tags = {}; //an area to store tags
	
	s.graph.nodes().forEach(function(n)
	{
		
		tags[n.tag] = true; // each node is read and checked if it contains a tag.  
							//if such a tag exists, it will record as true
	})
	
	var nodetagElt = _.$('node-tags'); //creates a variable for a dynamically created list
	Object.keys(tags).forEach(function(c)
	{
		//for each tag, an option is created with the text of the tag and this is 
		//pushed into the option list
		var optionElt = document.createElement("option"); 
		optionElt.text = c;
		nodetagElt.add(optionElt);
	});
	
	//for each option, this function is attached to it. 
	//It looks for a specific tag and filters accordingly.
	function applyTagFilter(e) {
	var c = e.target[e.target.selectedIndex].value;
	filter
		.undo('node-tags')
		.nodesBy(function(n) {
			return !c.length || n.tag === c;
		}, 'node-tags')
		.apply();
}
//in the dynamically created list, when the options are changed,
	//it changes to that specific filter and undoes the previous filter.  
_.$('node-tags').addEventListener("change", applyTagFilter);
}