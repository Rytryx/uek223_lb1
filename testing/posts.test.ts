import { loadPosts, editPost, deletePost, addComment } from '../client/posts';

// Mocken von fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockClear();
});

test('loadPosts should load posts and render them', async () => {
  // Mocken der fetch-Antwort
  mockFetch.mockResolvedValueOnce({
    ok: true,
    status: 200,
    json: async () => [{ id: 1, username: "testuser", content: "Testpost" }],
  } as Response);

  // Aufruf der loadPosts-Funktion
  await loadPosts();

  // Überprüfen, ob fetch aufgerufen wurde
  expect(mockFetch).toHaveBeenCalledTimes(1);

  // Überprüfen, ob die Posts im DOM gerendert wurden
  const posts = document.querySelectorAll('.post');
  expect(posts.length).toBe(1);
});


// Simulieren der globalen Dokumentobjekte
document.body.innerHTML = `
  <div class="posts"></div>
  <input id="newPostContent" value="Neuer Post"/>
  <button id="submitPost"></button>
  <input id="new-comment-1" value="Neuer Kommentar"/>
`;

describe('Posts Functions', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  test('loadPosts should load posts and render them', async () => {
    // Mocken der fetch-Antwort
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => [{ id: 1, username: "testuser", content: "Testpost" }],
    } as Response);

    // Hier den Code ausführen, der loadPosts aufruft

    // Überprüfen, ob mockFetch aufgerufen wurde
    expect(mockFetch).toHaveBeenCalledTimes(1);

    // Überprüfen, ob die Posts im DOM gerendert wurden
    const posts = document.querySelectorAll('.post');
    expect(posts.length).toBe(1);
  });

  test('editPost should update a post', async () => {
    // Mocking window.prompt
    window.prompt = jest.fn(() => "Bearbeiteter Inhalt");

    await editPost(1);

    // Überprüfen, ob fetch mit PUT-Methode aufgerufen wurde
    expect(fetch).toHaveBeenCalledWith(`/api/posts/post/1`, expect.any(Object));
    expect(fetch.mock.calls[0][1].method).toBe('PUT');
  });

  test('deletePost should remove a post', async () => {
    await deletePost(1);

    // Überprüfen, ob fetch mit DELETE-Methode aufgerufen wurde
    expect(fetch).toHaveBeenCalledWith(`/api/posts/post/1`, expect.any(Object));
    expect(fetch.mock.calls[0][1].method).toBe('DELETE');
  });

  test('addComment should post a new comment', async () => {
    await addComment(1);

    // Überprüfen, ob fetch mit POST-Methode aufgerufen wurde
    expect(fetch).toHaveBeenCalledWith('/api/comment', expect.any(Object));
    expect(fetch.mock.calls[0][1].method).toBe('POST');
  });

  // Weitere Tests für andere Funktionen...
});
