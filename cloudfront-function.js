function handler(event) {
  var request = event.request;
  var uri = request.uri;

  // Check whether the URI is missing a file name.
  if (uri.endsWith("/")) {
    request.uri += "index.html";
  }
  // Check whether the URI is missing a file extension.
  else if (!uri.includes(".")) {
    // It's a directory-like path (e.g., /projects/nomad-net), add trailing slash and index.html
    request.uri += "/index.html";
  }

  return request;
}
