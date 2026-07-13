const FALLBACK_IMAGE_URL =
  'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-compressor.jpg';

export function getCoverImageUrl(imageUrls) {
  const firstValidImage = imageUrls?.find((url) => typeof url === 'string' && url.trim());

  return firstValidImage || FALLBACK_IMAGE_URL;
}