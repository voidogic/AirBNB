maptilersdk.config.apiKey = mapToken;
const map = new maptilersdk.Map({
  container: "map",
  style: maptilersdk.MapStyle.STREETS,
  center: listing.geometry.coordinates,
  zoom: 9,
});

const marker = new maptilersdk.Marker({ color: "red" })
  .setLngLat(listing.geometry.coordinates)
  .setPopup(
    new maptilersdk.Popup({ offset: 25 }).setHTML(
      `<div class="map-click">
      <h4><b>${listing.title}</b></h4> 
      <p>Exact location will be provided after booking.</p>
      </div>`
    )
  )
  .addTo(map);

map.addControl(new maptilersdk.ScaleControl());
map.addControl(new maptilersdk.NavigationControl());