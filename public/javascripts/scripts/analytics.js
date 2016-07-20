'use strict';



var arrayOfStates = [];


$(document).ready(function() {
    var fullPlayersList = players;


    if ($('#analytics').length > 0) {

        var states = getAllStates(fullPlayersList);

        states.sort(function(a, b) {
            return b.count - a.count;
        });
        console.log(states);
        drawChart(states);
    }

});

function drawChart(data) {
    (function(d3) {

        var width = 320;
        var height = 320;
        var radius = Math.min(width, height) / 2;
        var donutWidth = 75;
        var legendRectSize = 18;
        var legendSpacing = 4;

        var color = d3.scaleOrdinal(d3.schemeCategory20b);

        var svg = d3.select('#analytics')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(' + (width / 2) +
                ',' + (height / 2) + ')');

        var arc = d3.arc()
            .innerRadius(radius - donutWidth)
            .outerRadius(radius);

        var pie = d3.pie()
            .value(function(d) {
                return d.count;
            })
            .sort(null);

        var tooltip = d3.select('#analytics')
            .append('div')
            .attr('class', 'tooltip');

        tooltip.append('div')
            .attr('class', 'label');

        tooltip.append('div')
            .attr('class', 'count');

        tooltip.append('div')
            .attr('class', 'percent');

        data.forEach(function(d) {
            d.count = +d.count;
            d.enabled = true; // NEW
        });

        var path = svg.selectAll('path')
            .data(pie(data))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', function(d, i) {
                return color(d.data.label);
            }) // UPDATED (removed semicolon)
            .each(function(d) { this._current = d; }); // NEW

        path.on('mouseover', function(d) {
            var total = d3.sum(data.map(function(d) {
                return (d.enabled) ? d.count : 0; // UPDATED
            }));
            var percent = Math.round(1000 * d.data.count / total) / 10;
            tooltip.select('.label').html(d.data.label);
            tooltip.select('.count').html(d.data.count);
            tooltip.select('.percent').html(percent + '%');
            tooltip.style('display', 'block');
        });

        path.on('mouseout', function() {
            tooltip.style('display', 'none');
        });

        /* OPTIONAL 
        path.on('mousemove', function(d) {
          tooltip.style('top', (d3.event.pageY + 10) + 'px')
            .style('left', (d3.event.pageX + 10) + 'px');
        });
        */
        var legendDiv = d3.select('#legend')
            .append('svg')
            .attr('width', 200)
            .attr('height', data.length * 24);

        var legend = legendDiv.selectAll('.legend')
            .data(color.domain())
            .enter()
            .append('g')
            .attr('class', 'legend')
            .attr('transform', function(d, i) {
                // var height = legendRectSize + legendSpacing;
                //var offset = height * color.domain().length / 2;
                //var horz = -2 * legendRectSize;
                var vert = i * 24;
                return 'translate(0,' + vert + ')';
            });

        legend.append('rect')
            .attr('width', legendRectSize)
            .attr('height', legendRectSize)
            .style('fill', color)
            .style('stroke', color) // UPDATED (removed semicolon)
            .on('click', function(label) { // NEW
                var rect = d3.select(this); // NEW
                var enabled = true; // NEW
                var totalEnabled = d3.sum(data.map(function(d) { // NEW
                    return (d.enabled) ? 1 : 0; // NEW
                })); // NEW

                if (rect.attr('class') === 'disabled') { // NEW
                    rect.attr('class', ''); // NEW
                } else { // NEW
                    if (totalEnabled < 2) return; // NEW
                    rect.attr('class', 'disabled'); // NEW
                    enabled = false; // NEW
                } // NEW

                pie.value(function(d) { // NEW
                    if (d.label === label) d.enabled = enabled; // NEW
                    return (d.enabled) ? d.count : 0; // NEW
                }); // NEW

                path = path.data(pie(data)); // NEW

                path.transition() // NEW
                    .duration(750) // NEW
                    .attrTween('d', function(d) { // NEW
                        var interpolate = d3.interpolate(this._current, d); // NEW
                        this._current = interpolate(0); // NEW
                        return function(t) { // NEW
                            return arc(interpolate(t)); // NEW
                        }; // NEW
                    }); // NEW
            }); // NEW

        legend.append('text')
            .attr('x', legendRectSize + legendSpacing)
            .attr('y', legendRectSize - legendSpacing)
            .text(function(d) {

                return getPlayerCount(d, data);
            });

    })(window.d3);

}
function getPlayerCount(state, data) {
	for (var x=0; x < data.length; x++) {
		if (data[x].label === state) {
			return state + ' : ' + data[x].count;
		}
	}
}

function getAllStates(fullPlayersList) {

    var cachedPlayerLength = fullPlayersList.length;
    for (var x = 0; x < cachedPlayerLength; x++) {
        if (fullPlayersList[x].state !== '&nbsp;') {
            if (isNewState(fullPlayersList[x].state)) {
                arrayOfStates.push({ 'label': fullPlayersList[x].state, 'count': 1 });
            }
        }
    }
    return arrayOfStates;
}

function isNewState(currentState) {
    var cachedLength = arrayOfStates.length;

    for (var x = 0; x < cachedLength; x++) {
        if (currentState === arrayOfStates[x].label) {
            arrayOfStates[x].count++;
            return false;
        }
    }
    return true;
}
