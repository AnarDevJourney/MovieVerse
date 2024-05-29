// Function for generating youtube link to watch movie trailer
export function generateYouTubeLink(title) {
  // Replacing spaces in the movie title with '+'
  const formattedTitle = title.replace(/\s+/g, "+");

  // Constructing the YouTube search URL for the movie trailer
  const youtubeLink = `https://www.youtube.com/results?search_query=${formattedTitle}+trailer`;

  return youtubeLink;
}
