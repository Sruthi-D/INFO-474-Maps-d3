var width = 700;
var height = 580;

var svg = d3.select( "body" )
    .append( "svg" )
    .attr( "width", width )
    .attr( "height", height );

var g = svg.append( "g" );

d3.json('nygeo.json').then(function(data) {

    d3.csv('data.csv').then(function(pointData) {
        var albersProjection = d3.geoAlbers()
            .scale( 190000 )
            .rotate( [71.057,0] )
            .center( [0, 42.313] )
            .translate( [width/2,height/2] );

        var geoPath = d3.geoPath()
            .projection( albersProjection );

        g.selectAll( "path" )
            .data(data.features )
            .enter()
            .append( "path" )
            //.attr( "fill", "#ccc" )
            //.attr( "stroke", "#333")
            .attr( "d", geoPath );

        svg.append('text')
            .attr('x', 400)
            .attr('y', 100)
            .style('font-size', '16pt')
            .text("Airbnb Listings in NYC")
            .attr('fill', 'black');
    
        // plots circles on the map
       function plotData(pointData) {
            svg.selectAll('circle').remove();

            g.selectAll('.circle')
                .data(pointData)
                .enter()
                .append('circle')
                    .attr("r", 6)
                    .attr('stroke', 'grey')
                    .attr('fill', '#A40034')
                    .attr('opacity', .5)
                    .attr('cx', function(d) { return(projection([d.longitude, d.latitude])[0]); }) 
                    .attr('cy', function(d) { return(projection([d.longitude, d.latitude])[1]) })
                .on('click', function(){
                    d3.select(this).remove();
                }); 
        }            
    })
})