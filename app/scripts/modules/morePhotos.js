// <div class="photo__grid-hover">
//                 <svg width="50" height="50" fill="#fff" class="photo__grid-icon">
//                   <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="assets/images/icons.svg#icon-iconsearch"></use>
//                 </svg>
//               </div>
export const itemTemplate = function (obj) {
  let tmp = '';
  tmp += '<div class="' + obj.class + '__grid-item new-item ' + obj.filter + '">';
  tmp += '<a href="' + obj.src + '" class="image-link">';
  tmp += '<div class="' + obj.class + '__grid-hover">';
  tmp += '<svg fill="#fff" class="' + obj.class + '__grid-icon">';
  tmp += '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="assets/images/icons.svg#icon-iconsearch"></use>';
  tmp += '</svg></div>';
  tmp += '<img src="' + obj.mini + '" alt=""></a></div>';

  return tmp;
};

export const achievs = [
  {
    src: 'assets/images/docs/others/lic3.jpg',
    mini: 'assets/images/docs/others/mlic3.jpg',
    filter: 'lic',
    class: 'achievs',
  },
  {
    src: 'assets/images/docs/1/dip7.jpg',
    mini: 'assets/images/docs/1/mdip7.jpg',
    filter: 'gon',
    class: 'achievs',
  },
  {
    src: 'assets/images/docs/1/dip6.jpg',
    mini: 'assets/images/docs/1/mdip6.jpg',
    filter: 'gon',
    class: 'achievs',
  },
  {
    src: 'assets/images/docs/3/dip2.jpg',
    mini: 'assets/images/docs/3/mdip2.jpg',
    filter: 'god',
    class: 'achievs',
  },
];

export const photos = [
  {
    src: 'assets/images/gallery/7.jpg',
    mini: 'assets/images/gallery/m7.jpg',
    filter: 'all',
    class: 'photo',
  },
  {
    src: 'assets/images/gallery/8.jpg',
    mini: 'assets/images/gallery/m8.jpg',
    filter: 'all',
    class: 'photo',
  },
  {
    src: 'assets/images/gallery/9.jpg',
    mini: 'assets/images/gallery/m9.jpg',
    filter: 'all',
    class: 'photo',
  },
  {
    src: 'assets/images/gallery/10.jpg',
    mini: 'assets/images/gallery/m10.jpg',
    filter: 'all',
    class: 'photo',
  },
  {
    src: 'assets/images/gallery/11.jpg',
    mini: 'assets/images/gallery/m11.jpg',
    filter: 'all',
    class: 'photo',
  },
  {
    src: 'assets/images/gallery/12.jpg',
    mini: 'assets/images/gallery/m12.jpg',
    filter: 'all',
    class: 'photo',
  },
  {
    src: 'assets/images/gallery/13.jpg',
    mini: 'assets/images/gallery/m13.jpg',
    filter: 'all',
    class: 'photo',
  },
];
