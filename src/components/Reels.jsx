import { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart, FaRegComment, FaShare } from 'react-icons/fa';
import { FiBookmark, FiMoreHorizontal } from 'react-icons/fi';
import { LuVolume2, LuVolumeX } from 'react-icons/lu';
import { useAuth } from '../auth/useAuth';

const reels = [
  {
    id: 1,
    username: 'travel.daily',
    avatar: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=100',
    caption: 'A little escape from the city 🌿 #travel #nature',
    likes: 95500,
    comments: 310,
    shares: 637,
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    poster: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=85&w=900',
  },
  {
    id: 2,
    username: 'daily.moments',
    avatar: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&q=80&w=100',
    caption: 'Small moments, big memories ✨ #daily',
    likes: 8300,
    comments: 128,
    shares: 94,
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    poster: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&q=85&w=900',
  },
  {
    id: 3,
    username: 'discover.more',
    avatar: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=100',
    caption: 'Where would you go next? 🌍 #explore',
    likes: 21900,
    comments: 502,
    shares: 637,
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    poster: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=85&w=900',
  },
  {
    id: 4,
    username: 'movie.nights',
    avatar: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=100',
    caption: 'Movie night, anyone? 🍿 #movies #weekend',
    likes: 5600,
    comments: 87,
    shares: 42,
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=85&w=900',
  },
  {
    id: 5,
    username: 'good.vibes',
    avatar: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&q=80&w=100',
    caption: 'A little something to brighten your day ☀️ #fun',
    likes: 9700,
    comments: 216,
    shares: 109,
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMobstaz.mp4',
    poster: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&q=85&w=900',
  },
];

const formatCount = (count) => (
  count >= 1000 ? `${(count / 1000).toFixed(count % 1000 === 0 ? 0 : 1)}k` : String(count)
);

const Reels = () => {
  const { user } = useAuth();
  const [likedReels, setLikedReels] = useState(() => new Set());
  const [savedReels, setSavedReels] = useState(() => new Set());
  const [sharedReels, setSharedReels] = useState(() => new Set());
  const [followedUsers, setFollowedUsers] = useState(() => new Set());
  const [commentsByReel, setCommentsByReel] = useState({});
  const [hiddenReelIds, setHiddenReelIds] = useState(() => new Set());
  const [commentDraft, setCommentDraft] = useState('');
  const [activeCommentsReel, setActiveCommentsReel] = useState(null);
  const [activeMoreReel, setActiveMoreReel] = useState(null);
  const [shareReel, setShareReel] = useState(null);
  const [shareStatus, setShareStatus] = useState('');
  const [moreMenuStatus, setMoreMenuStatus] = useState('');
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (!moreMenuStatus) return undefined;

    const timeoutId = window.setTimeout(() => setMoreMenuStatus(''), 2500);
    return () => window.clearTimeout(timeoutId);
  }, [moreMenuStatus]);

  const toggleReelSet = (setter, reelId) => {
    setter((previous) => {
      const next = new Set(previous);
      if (next.has(reelId)) next.delete(reelId);
      else next.add(reelId);
      return next;
    });
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    const text = commentDraft.trim();
    if (!text || activeCommentsReel === null) return;

    setCommentsByReel((previous) => ({
      ...previous,
      [activeCommentsReel]: [...(previous[activeCommentsReel] || []), text],
    }));
    setCommentDraft('');
  };

  const handleCopyShareLink = async () => {
    const shareUrl = `${window.location.origin}/reels#reel-${shareReel}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareStatus('Link copied');
    } catch {
      setShareStatus('Copy is unavailable. Select and copy the link above.');
    }
  };

  const handleCopyReelLink = async (reelId) => {
    const reelUrl = `${window.location.origin}/reels#reel-${reelId}`;
    try {
      await navigator.clipboard.writeText(reelUrl);
      setMoreMenuStatus('Reel link copied');
    } catch {
      setMoreMenuStatus('Could not copy link. Check browser clipboard permissions.');
    }
    setActiveMoreReel(null);
  };

  return (
    <main className="h-svh overflow-hidden bg-[#101113] text-white">
      <div className="h-full snap-y snap-mandatory overflow-y-auto overscroll-y-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {reels.filter((reel) => !hiddenReelIds.has(reel.id)).map((reel) => {
          const isLiked = likedReels.has(reel.id);
          const isSaved = savedReels.has(reel.id);
          const isShared = sharedReels.has(reel.id);
          const isFollowed = followedUsers.has(reel.username);
          const reelComments = commentsByReel[reel.id] || [];

          return (
            <section
              key={reel.id}
              id={`reel-${reel.id}`}
              className="flex h-svh min-h-svh w-full flex-none snap-always snap-start items-center justify-center gap-2 overflow-hidden px-2 py-4 sm:gap-6 sm:px-3"
              aria-label={`Reel by ${reel.username}`}
            >
              <article
                className="relative h-[min(78svh,568px)] w-[min(72vw,320px,43.875svh)] flex-none overflow-hidden rounded-lg bg-black"
              >
                <video
                  className="h-full w-full object-cover"
                  src={reel.video}
                  poster={reel.poster}
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent px-4 pb-5 pt-24">
                  <p className="line-clamp-2 text-sm">{reel.caption}</p>
                </div>
                <div className="absolute bottom-5 left-4 flex items-center gap-3">
                  <img
                    src={reel.avatar}
                    alt=""
                    className="h-10 w-10 rounded-full border border-white/70 object-cover"
                  />
                  <span className="max-w-24 truncate text-sm font-semibold">@{reel.username}</span>
                  <button
                    type="button"
                    className="rounded-md border border-white/80 px-3 py-1 text-sm font-semibold hover:bg-white/15"
                    aria-pressed={isFollowed}
                    onClick={() => toggleReelSet(setFollowedUsers, reel.username)}
                  >
                    {isFollowed ? 'Following' : 'Follow'}
                  </button>
                </div>
                <button
                  type="button"
                  className="absolute bottom-5 right-4 rounded-full bg-black/50 p-2"
                  aria-label={isMuted ? 'Unmute Reel' : 'Mute Reel'}
                  aria-pressed={!isMuted}
                  onClick={() => setIsMuted((muted) => !muted)}
                >
                  {isMuted ? <LuVolumeX /> : <LuVolume2 />}
                </button>
              </article>

              <div className="flex h-[min(78svh,568px)] w-10 flex-none flex-col items-center justify-center gap-4 sm:w-12 sm:gap-5">
                <button
                  type="button"
                  className="flex flex-col items-center gap-1"
                  aria-label={isLiked ? 'Unlike Reel' : 'Like Reel'}
                  aria-pressed={isLiked}
                  onClick={() => toggleReelSet(setLikedReels, reel.id)}
                >
                  {isLiked ? <FaHeart className="text-2xl text-red-500" /> : <FaRegHeart className="text-2xl" />}
                  <span className="text-sm">{formatCount(reel.likes + (isLiked ? 1 : 0))}</span>
                </button>
                <button
                  type="button"
                  className="flex flex-col items-center gap-1"
                  aria-label={`View comments for Reel by ${reel.username}`}
                  onClick={() => {
                    setActiveCommentsReel(reel.id);
                    setCommentDraft('');
                  }}
                >
                  <FaRegComment className="text-2xl" />
                  <span className="text-sm">{formatCount(reel.comments + reelComments.length)}</span>
                </button>
                <button
                  type="button"
                  className="flex flex-col items-center gap-1"
                  aria-label={isShared ? 'Undo repost' : 'Repost'}
                  aria-pressed={isShared}
                  onClick={() => toggleReelSet(setSharedReels, reel.id)}
                >
                  <svg
                    className={`h-7 w-7 ${isShared ? 'text-green-400' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m17 2 4 4-4 4" />
                    <path d="M3 11V9a3 3 0 0 1 3-3h15" />
                    <path d="m7 22-4-4 4-4" />
                    <path d="M21 13v2a3 3 0 0 1-3 3H3" />
                  </svg>
                  <span className="text-sm">{formatCount(reel.shares + (isShared ? 1 : 0))}</span>
                </button>
                <button
                  type="button"
                  aria-label={`Share Reel by ${reel.username}`}
                  onClick={() => {
                    setShareReel(reel.id);
                    setShareStatus('');
                  }}
                >
                  <FaShare className="text-2xl" />
                </button>
                <button
                  type="button"
                  aria-label={isSaved ? 'Unsave Reel' : 'Save Reel'}
                  aria-pressed={isSaved}
                  onClick={() => toggleReelSet(setSavedReels, reel.id)}
                >
                  <FiBookmark className={`text-2xl ${isSaved ? 'fill-white' : ''}`} />
                </button>
                <div className="relative">
                  <button
                    type="button"
                    aria-label="More Reel options"
                    aria-expanded={activeMoreReel === reel.id}
                    onClick={() => {
                      setMoreMenuStatus('');
                      setActiveMoreReel((activeId) => activeId === reel.id ? null : reel.id);
                    }}
                  >
                    <FiMoreHorizontal className="text-2xl" />
                  </button>
                  {activeMoreReel === reel.id && (
                    <div className="absolute bottom-full right-0 z-30 mb-2 w-44 overflow-hidden rounded-lg border border-zinc-700 bg-zinc-950 py-1 text-left text-sm shadow-xl">
                      <button
                        type="button"
                        className="block w-full px-4 py-2 text-left hover:bg-zinc-800"
                        onClick={() => {
                          toggleReelSet(setSavedReels, reel.id);
                          setActiveMoreReel(null);
                        }}
                      >
                        {isSaved ? 'Unsave Reel' : 'Save Reel'}
                      </button>
                      <button
                        type="button"
                        className="block w-full px-4 py-2 text-left hover:bg-zinc-800"
                        onClick={() => handleCopyReelLink(reel.id)}
                      >
                        Copy link
                      </button>
                      <button
                        type="button"
                        className="block w-full px-4 py-2 text-left text-red-400 hover:bg-zinc-800"
                        onClick={() => {
                          setHiddenReelIds((previous) => new Set(previous).add(reel.id));
                          setActiveMoreReel(null);
                        }}
                      >
                        Not interested
                      </button>
                    </div>
                  )}
                </div>
                <img
                  src={reel.avatar}
                  alt=""
                  className="block h-10 w-10 flex-none rounded-md border border-white/70 object-cover"
                  style={{ width: 40, height: 40 }}
                />
              </div>
            </section>
          );
        })}
      </div>

      {moreMenuStatus && (
        <p className="fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 rounded-lg bg-zinc-800 px-4 py-2 text-sm text-white shadow-lg" role="status">
          {moreMenuStatus}
        </p>
      )}

      {activeCommentsReel !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reel-comments-title"
          onClick={() => setActiveCommentsReel(null)}
        >
          <div
            className="flex max-h-[80svh] w-full max-w-md flex-col rounded-xl border border-zinc-700 bg-zinc-950 p-5"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 id="reel-comments-title" className="text-lg font-semibold">Comments</h2>
              <button
                type="button"
                aria-label="Close comments"
                className="text-2xl"
                onClick={() => setActiveCommentsReel(null)}
              >
                ×
              </button>
            </div>
            <div className="min-h-24 flex-1 space-y-3 overflow-y-auto">
              {(commentsByReel[activeCommentsReel] || []).map((comment, index) => (
                <p key={`${activeCommentsReel}-comment-${index}`} className="text-sm">
                  <span className="mr-2 font-semibold">{user.username}</span>{comment}
                </p>
              ))}
              {!(commentsByReel[activeCommentsReel] || []).length && (
                <p className="py-8 text-center text-sm text-zinc-400">Be the first to comment.</p>
              )}
            </div>
            <form className="mt-4 flex gap-2 border-t border-zinc-800 pt-4" onSubmit={handleCommentSubmit}>
              <input
                autoFocus
                type="text"
                value={commentDraft}
                onChange={(event) => setCommentDraft(event.target.value)}
                placeholder="Add a comment..."
                aria-label="Add a comment"
                className="min-w-0 flex-1 rounded-md border border-zinc-700 bg-black px-3 py-2 text-sm outline-none focus:border-zinc-500"
              />
              <button
                type="submit"
                disabled={!commentDraft.trim()}
                className="rounded-md px-3 text-sm font-semibold text-sky-400 disabled:opacity-40"
              >
                Post
              </button>
            </form>
          </div>
        </div>
      )}

      {shareReel !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="share-reel-title"
          onClick={() => setShareReel(null)}
        >
          <div
            className="w-full max-w-md rounded-xl border border-zinc-700 bg-zinc-950 p-5"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 id="share-reel-title" className="text-lg font-semibold">Share Reel</h2>
              <button
                type="button"
                aria-label="Close share dialog"
                className="text-2xl"
                onClick={() => setShareReel(null)}
              >
                ×
              </button>
            </div>
            <label htmlFor="reel-share-link" className="mb-2 block text-sm text-zinc-400">
              Reel link
            </label>
            <div className="flex gap-2">
              <input
                id="reel-share-link"
                readOnly
                value={`${window.location.origin}/reels#reel-${shareReel}`}
                onFocus={(event) => event.target.select()}
                className="min-w-0 flex-1 rounded-md border border-zinc-700 bg-black px-3 py-2 text-sm text-zinc-300"
              />
              <button
                type="button"
                onClick={handleCopyShareLink}
                className="rounded-md bg-sky-500 px-4 py-2 text-sm font-semibold text-white"
              >
                Copy
              </button>
            </div>
            {shareStatus && <p className="mt-3 text-sm text-zinc-300" role="status">{shareStatus}</p>}
          </div>
        </div>
      )}
    </main>
  );
};

export default Reels;
