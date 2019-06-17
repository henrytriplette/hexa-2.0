function camStart() {
  host = window.location.hostname;
  img = 'http://' + host + ':9000/?action=stream';
  jQuery('#livecam').attr('src',img)

  imgFace = 'http://' + host + ':9000/?action=snapshot';
  jQuery('#livecam_faceTracking').attr('src',imgFace)

  img_2 = 'http://' + host + ':9001';
  jQuery('#livecam_2').attr('src',img_2)
}
