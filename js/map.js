document.addEventListener('DOMContentLoaded', function() {
  if (!document.getElementById('vector-map')) return;

  var markers = [
    { coords: [23.0225, 72.5714], name: "Gujarat, India<br><small>Zaffra Agro Export HQ</small>" },
    { coords: [25.2048, 55.2708], name: "Dubai, UAE<br><small>Gulf States Market</small>" },
    { coords: [24.7136, 46.6753], name: "Riyadh, Saudi Arabia" },
    { coords: [25.2854, 51.5310], name: "Doha, Qatar" },
    { coords: [51.5074, -0.1278], name: "London, UK<br><small>European Market</small>" },
    { coords: [52.3676, 4.9041], name: "Amsterdam, Netherlands" },
    { coords: [50.1109, 8.6821], name: "Frankfurt, Germany" },
    { coords: [1.3521, 103.8198], name: "Singapore<br><small>South-East Asia Hub</small>" },
    { coords: [3.1390, 101.6869], name: "Kuala Lumpur, Malaysia" },
    { coords: [6.9271, 79.8612], name: "Colombo, Sri Lanka" }
  ];

  var map = new jsVectorMap({
    selector: '#vector-map',
    map: 'world',
    zoomOnScroll: false,
    zoomButtons: false,
    backgroundColor: 'transparent',
    regionStyle: {
      initial: {
        fill: 'rgba(253, 250, 244, 0.08)',
        stroke: 'none',
        strokeWidth: 0,
        fillOpacity: 1
      },
      hover: {
        fill: 'rgba(253, 250, 244, 0.2)'
      }
    },
    markers: markers,
    markerStyle: {
      initial: {
        fill: '#C89020',
        stroke: '#FDFAF4',
        strokeWidth: 2,
        r: 6
      },
      hover: {
        r: 9,
        fill: '#C89020',
        stroke: '#FDFAF4',
        strokeWidth: 2
      }
    },
    onMarkerTooltipShow: function(tooltip, index) {
      tooltip.text(
        '<div style="background:var(--forest-mid); color:var(--cream); padding:4px 8px; border-radius:3px; border:1px solid rgba(200,144,32,0.4); text-align:center;">' +
        '<strong>' + markers[index].name + '</strong>' +
        '</div>'
      , true);
    }
  });
});
