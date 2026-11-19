import { useEffect, useRef, useState } from 'react';
import { 
  GoHomeFill, 
  GoSearch, 
  GoHeart,
  GoHeartFill,
} from 'react-icons/go';
import { LuCompass, LuHeart, LuMenu, LuPlus, LuX } from 'react-icons/lu';
import { FiSend, FiBookmark, FiMoreHorizontal } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';
import { BsChat, BsPlayBtn } from 'react-icons/bs';
import { FaInstagram, FaRegSmile, FaRetweet } from 'react-icons/fa';
import { FaCircleCheck } from 'react-icons/fa6';
import { useAuth } from '../auth/useAuth';

const COMMENT_EMOJIS = [
  '😀', '😂', '🥹', '😍', '🥰', '😎', '😭', '😮',
  '🤗', '🤔', '🙌', '👏', '👍', '👎', '🙏', '💪',
  '❤️', '🔥', '✨', '🎉', '💯', '🥳', '😘', '💖',
];

const HomeFeed = () => {
  const { user, logOut } = useAuth();
  const currentUsername = user.username;
  const currentUserAvatar = user.avatarUrl || './public/my-img.jpeg';
  const [logoutError, setLogoutError] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedProfileUsername, setSelectedProfileUsername] = useState('');
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isSavedPostsOpen, setIsSavedPostsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showNotificationBadge, setShowNotificationBadge] = useState(true);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [createPostImage, setCreatePostImage] = useState('');
  const [createPostCaption, setCreatePostCaption] = useState('');
  const [createPostLocation, setCreatePostLocation] = useState('');
  const [createPostError, setCreatePostError] = useState('');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      username: 'sarah_ui',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
      message: 'liked your post.',
      time: '2m',
      postId: 1,
      read: false,
      kind: 'like',
    },
    {
      id: 2,
      username: 'alex_dev',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      message: 'started following you.',
      time: '1h',
      read: false,
      kind: 'follow',
    },
    {
      id: 3,
      username: 'react_js',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
      message: 'commented: “Love this shot!”',
      time: '3h',
      postId: 4,
      read: false,
      kind: 'comment',
    },
    {
      id: 4,
      username: 'creative.frames',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      message: 'liked your post.',
      time: '1d',
      postId: 5,
      read: true,
      kind: 'like',
    },
  ]);

  // Dummy data for stories
  const stories = [
    { id: 1, username: 'your_story', avatar: './public/my-img.jpeg', isUser: true },
    { id: 2, username: 'alex_dev', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150', storyImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=90&w=1080' },
    { id: 3, username: 'sarah_ui', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150', storyImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=90&w=1080' },
    { id: 4, username: 'code_master', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150', storyImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=90&w=1080' },
    { id: 5, username: 'react_js', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150', storyImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=90&w=1080' },
  ];

  // Dummy data for posts
  const posts = [
    {
      id: 1,
      username: 'code_master',
      userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
      location: 'Silicon Valley, California',
      postImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
      likesCount: 1500,
      caption: 'Building clean UI components with React and Tailwind CSS. 🚀 #coding #webdev',
      commentsCount: 2300,
      reshares: 148,
      timeAgo: '2 HOURS AGO'
    },
    {
      id: 2,
      username: 'sarah_ui',
      userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
      location: 'Brooklyn, New York',
      postImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800',
      likesCount: 8200,
      caption: 'A little workspace inspiration for the week ✨ #design #workspace',
      commentsCount: 342,
      reshares: 96,
      timeAgo: '5 HOURS AGO'
    },
    {
      id: 3,
      username: 'alex_dev',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      location: 'Yosemite National Park',
      postImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
      likesCount: 12400,
      caption: 'Weekend reset in the mountains 🏔️ #nature #weekend',
      commentsCount: 876,
      reshares: 521,
      timeAgo: '1 DAY AGO'
    },
    {
      id: 4,
      username: 'react_js',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
      location: 'Tokyo, Japan',
      postImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=800',
      likesCount: 3700,
      caption: 'Tokyo nights never disappoint 🌃 #travel #tokyo',
      commentsCount: 219,
      reshares: 74,
      timeAgo: '1 DAY AGO'
    },
    {
      id: 5,
      username: 'creative.frames',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      location: 'Big Sur, California',
      postImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=800',
      likesCount: 6100,
      caption: 'Chasing golden hour by the coast 🌅 #photography #goldenhour',
      commentsCount: 481,
      reshares: 203,
      timeAgo: '2 DAYS AGO'
    }
  ];

  const [feedPosts, setFeedPosts] = useState(posts);
  const [likedPostIds, setLikedPostIds] = useState(() => new Set());
  const [resharedPostIds, setResharedPostIds] = useState(() => new Set());
  const [savedPostIds, setSavedPostIds] = useState(() => new Set());
  const [followedUsers, setFollowedUsers] = useState(() => new Set());
  const [commentsByPost, setCommentsByPost] = useState({});
  const [commentDrafts, setCommentDrafts] = useState({});
  const [activeCommentEmojiPostId, setActiveCommentEmojiPostId] = useState(null);
  const [activePostMenuId, setActivePostMenuId] = useState(null);
  const [postMenuStatus, setPostMenuStatus] = useState('');
  const [activeStory, setActiveStory] = useState(null);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [messageDraft, setMessageDraft] = useState('');
  const [activeConversationId, setActiveConversationId] = useState('alex_dev');
  const [conversations, setConversations] = useState([
    {
      id: 'alex_dev',
      username: 'alex_dev',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      messages: [
        { id: 1, sender: 'them', text: 'Hey! How is the new project going?' },
        { id: 2, sender: 'me', text: 'Going great, thanks for asking!' },
        { id: 3, sender: 'them', text: 'That is awesome. Share an update soon!' },
      ],
    },
    {
      id: 'sarah_ui',
      username: 'sarah_ui',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
      messages: [
        { id: 1, sender: 'them', text: 'Loved your latest post ✨' },
      ],
    },
    {
      id: 'code_master',
      username: 'code_master',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
      messages: [
        { id: 1, sender: 'them', text: 'Are you working with React too?' },
      ],
    },
  ]);
  const [doubleClickedPostId, setDoubleClickedPostId] = useState(null);
  const doubleClickLikeTimer = useRef(null);
  const commentInputRefs = useRef({});

  useEffect(() => () => window.clearTimeout(doubleClickLikeTimer.current), []);

  useEffect(() => {
    if (!postMenuStatus) return undefined;

    const timeoutId = window.setTimeout(() => setPostMenuStatus(''), 2500);
    return () => window.clearTimeout(timeoutId);
  }, [postMenuStatus]);

  useEffect(() => {
    if (!activeStory) return undefined;

    const timeoutId = window.setTimeout(() => setActiveStory(null), 3000);
    return () => window.clearTimeout(timeoutId);
  }, [activeStory]);

  const formatCount = (count) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(count % 1000 === 0 ? 0 : 1).replace(/\.0$/, '')}k`;
    }
    return String(count);
  };

  const togglePostCount = (postId, flagSetter, flags, countKey) => {
    const wasActive = flags.has(postId);
    flagSetter((previous) => {
      const next = new Set(previous);
      if (wasActive) next.delete(postId);
      else next.add(postId);
      return next;
    });
    setFeedPosts((previous) => previous.map((post) => (
      post.id === postId
        ? { ...post, [countKey]: post[countKey] + (wasActive ? -1 : 1) }
        : post
    )));
  };

  const handleCommentSubmit = (event, postId) => {
    event.preventDefault();
    const text = commentDrafts[postId]?.trim();
    if (!text) return;

    setCommentsByPost((previous) => ({
      ...previous,
      [postId]: [...(previous[postId] || []), text],
    }));
    setFeedPosts((previous) => previous.map((post) => (
      post.id === postId
        ? { ...post, commentsCount: post.commentsCount + 1 }
        : post
    )));
    setCommentDrafts((previous) => ({ ...previous, [postId]: '' }));
  };

  const insertCommentEmoji = (postId, emoji) => {
    const input = commentInputRefs.current[postId];
    const currentDraft = commentDrafts[postId] || '';
    const start = input?.selectionStart ?? currentDraft.length;
    const end = input?.selectionEnd ?? currentDraft.length;
    const nextDraft = `${currentDraft.slice(0, start)}${emoji}${currentDraft.slice(end)}`;
    const cursor = start + emoji.length;

    setCommentDrafts((previous) => ({ ...previous, [postId]: nextDraft }));
    setActiveCommentEmojiPostId(null);

    if (input) {
      requestAnimationFrame(() => {
        input.focus();
        input.setSelectionRange(cursor, cursor);
      });
    }
  };

  const handleCreatePostImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setCreatePostError('Please choose an image file.');
      event.target.value = '';
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setCreatePostError('Image must be smaller than 10 MB.');
      event.target.value = '';
      return;
    }

    setCreatePostError('');
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setCreatePostImage(reader.result);
      } else {
        setCreatePostError('Could not load this image. Please choose another one.');
      }
    };
    reader.onerror = () => setCreatePostError('Could not read this image. Please try another file.');
    reader.readAsDataURL(file);
  };

  const handleCreatePostSubmit = (event) => {
    event.preventDefault();
    if (!createPostImage) {
      setCreatePostError('Choose a photo before sharing your post.');
      return;
    }

    const newPost = {
      id: Date.now(),
      username: currentUsername,
      userAvatar: currentUserAvatar,
      location: createPostLocation.trim(),
      postImage: createPostImage,
      likesCount: 0,
      caption: createPostCaption.trim(),
      commentsCount: 0,
      reshares: 0,
      timeAgo: 'JUST NOW',
    };
    setFeedPosts((previous) => [newPost, ...previous]);
    setCreatePostImage('');
    setCreatePostCaption('');
    setCreatePostLocation('');
    setCreatePostError('');
    setIsCreatePostOpen(false);
  };

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    const text = messageDraft.trim();
    if (!text) return;

    setConversations((previous) => previous.map((conversation) => (
      conversation.id === activeConversationId
        ? {
            ...conversation,
            messages: [
              ...conversation.messages,
              { id: Date.now(), sender: 'me', text },
            ],
          }
        : conversation
    )));
    setMessageDraft('');
  };

  const handleCopyPostLink = async (postId) => {
    const postUrl = `${window.location.origin}/home#post-${postId}`;
    try {
      await navigator.clipboard.writeText(postUrl);
      setPostMenuStatus('Post link copied');
    } catch {
      setPostMenuStatus('Could not copy link. Check browser clipboard permissions.');
    }
    setActivePostMenuId(null);
  };

  const handlePostDoubleClick = (postId) => {
    if (!likedPostIds.has(postId)) {
      togglePostCount(postId, setLikedPostIds, likedPostIds, 'likesCount');
    }

    window.clearTimeout(doubleClickLikeTimer.current);
    setDoubleClickedPostId(postId);
    doubleClickLikeTimer.current = window.setTimeout(() => {
      setDoubleClickedPostId(null);
      doubleClickLikeTimer.current = null;
    }, 3000);
  };

  const openProfile = (username) => {
    setSelectedProfileUsername(username);
    setIsProfileOpen(true);
  };

  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  const profileUsername = selectedProfileUsername || currentUsername;
  const isOwnProfile = profileUsername === currentUsername;
  const profilePosts = feedPosts.filter((post) => post.username === profileUsername);
  const profileAvatar = isOwnProfile
    ? currentUserAvatar
    : profilePosts[0]?.userAvatar || stories.find((story) => story.username === profileUsername)?.avatar || currentUserAvatar;
  const unreadNotificationsCount = notifications.filter((notification) => !notification.read).length;
  const searchableUsers = stories
    .filter((story) => !story.isUser)
    .map((story) => ({
      username: story.username,
      avatar: story.avatar,
      story,
      post: feedPosts.find((post) => post.username === story.username),
    }));
  feedPosts.forEach((post) => {
    if (!searchableUsers.some((user) => user.username === post.username)) {
      searchableUsers.push({
        username: post.username,
        avatar: post.userAvatar,
        story: stories.find((story) => story.username === post.username),
        post,
      });
    }
  });
  const matchingUsers = normalizedSearchQuery
    ? searchableUsers.filter((user) => user.username.toLowerCase().includes(normalizedSearchQuery))
    : [];
  const matchingPosts = normalizedSearchQuery
    ? feedPosts.filter((post) => (
        `${post.username} ${post.location} ${post.caption}`.toLowerCase().includes(normalizedSearchQuery)
      ))
    : [];

  return (
    <div className="bg-black min-h-screen text-white flex justify-center">
      <button
        type="button"
        className="fixed left-4 top-4 z-[60] rounded-md bg-black p-2 text-2xl sm:hidden"
        aria-label={isSidebarOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isSidebarOpen}
        aria-controls="homefeed-sidebar"
        onClick={() => setIsSidebarOpen((open) => !open)}
      >
        {isSidebarOpen ? <LuX aria-hidden="true" /> : <LuMenu aria-hidden="true" />}
      </button>

      {isSidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/60 sm:hidden"
          aria-label="Close navigation menu"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <button
        type="button"
        className="fixed inset-y-0 left-0 z-40 hidden w-4 cursor-e-resize sm:block"
        aria-label="Open sidebar"
        aria-controls="homefeed-sidebar"
        aria-expanded={isSidebarOpen}
        onMouseEnter={() => setIsSidebarOpen(true)}
        onClick={() => setIsSidebarOpen(true)}
      />
      
      {/* Left Sidebar Navigation */}
      <aside
        id="homefeed-sidebar"
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col justify-between overflow-y-auto border-r border-zinc-800 bg-black px-4 py-8 transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        onMouseLeave={() => {
          if (window.matchMedia('(min-width: 640px)').matches) {
            setIsSidebarOpen(false);
          }
        }}
      >
        <div>
          {/* Logo */}
          <h1 className="mb-8 px-3 text-3xl" aria-label="Instagram">
            <FaInstagram aria-hidden="true" />
          </h1>
          
          {/* Nav Items */}
          <nav
            className="flex flex-col gap-2"
            onClick={() => {
              if (window.matchMedia('(max-width: 639px)').matches) {
                setIsSidebarOpen(false);
              }
            }}
          >
            <a href="#" className="flex items-center gap-4 hover:bg-zinc-900 p-3 rounded-lg font-semibold text-sm transition">
              <GoHomeFill className="text-2xl" /> Home
            </a>
            <a href="/reels" className="flex items-center gap-4 hover:bg-zinc-900 p-3 rounded-lg text-sm transition">
              <BsPlayBtn className="text-2xl" aria-hidden="true" /> Reels
            </a>
            <button
              type="button"
              className="flex w-full items-center gap-4 rounded-lg p-3 text-left text-sm transition hover:bg-zinc-900"
              onClick={() => {
                setActiveConversationId('alex_dev');
                setIsMessagesOpen(true);
              }}
            >
              <FiSend className="text-2xl" aria-hidden="true" /> Messages
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-4 rounded-lg p-3 text-left text-sm transition hover:bg-zinc-900"
              aria-expanded={isSearchOpen}
              onClick={() => {
                setSearchQuery('');
                setIsSearchOpen(true);
              }}
            >
              <GoSearch className="text-2xl" /> Search
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-4 rounded-lg p-3 text-left text-sm transition hover:bg-zinc-900"
              aria-expanded={isNotificationsOpen}
              onClick={() => setIsNotificationsOpen(true)}
            >
              <LuHeart className="text-2xl" aria-hidden="true" />
              <span>Notifications</span>
              {showNotificationBadge && unreadNotificationsCount > 0 && (
                <span className="ml-auto rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-semibold">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-4 rounded-lg p-3 text-left text-sm transition hover:bg-zinc-900"
              aria-expanded={isExploreOpen}
              onClick={() => setIsExploreOpen(true)}
            >
              <LuCompass className="text-2xl" aria-hidden="true" /> Explore
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-4 rounded-lg p-3 text-left text-sm transition hover:bg-zinc-900"
              onClick={() => {
                setCreatePostError('');
                setIsCreatePostOpen(true);
              }}
            >
              <LuPlus className="text-2xl" aria-hidden="true" /> Create
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-4 rounded-lg p-3 text-left text-sm transition hover:bg-zinc-900"
              aria-expanded={isProfileOpen}
              onClick={() => openProfile(currentUsername)}
            >
              <svg
                className="h-6 w-6 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="9" r="3" />
                <path d="M7 20.2a5 5 0 0 1 10 0" />
              </svg>
              <span>My Profile</span>
            </button>
            <div className="relative">
              <button
                type="button"
                className="flex w-full items-center gap-4 rounded-lg p-3 text-left text-sm transition hover:bg-zinc-900"
                aria-expanded={isMoreOpen}
                onClick={() => setIsMoreOpen((open) => !open)}
              >
                <LuMenu className="text-2xl" aria-hidden="true" /> More
              </button>
              {isMoreOpen && (
                <div className="mt-2 overflow-hidden rounded-xl border border-zinc-700 bg-zinc-950 py-1 shadow-xl">
                  <button
                    type="button"
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition hover:bg-zinc-800"
                    onClick={() => {
                      setIsMoreOpen(false);
                      setIsSavedPostsOpen(true);
                    }}
                  >
                    <FiBookmark aria-hidden="true" /> Saved
                    <span className="ml-auto text-xs text-zinc-500">{savedPostIds.size}</span>
                  </button>
                  <button
                    type="button"
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition hover:bg-zinc-800"
                    onClick={() => {
                      setIsMoreOpen(false);
                      setIsSettingsOpen(true);
                    }}
                  >
                    <LuMenu aria-hidden="true" /> Settings
                  </button>
                  <button
                    type="button"
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition hover:bg-zinc-800"
                    onClick={() => {
                      setIsMoreOpen(false);
                      openProfile(currentUsername);
                    }}
                  >
                    <GoHeart aria-hidden="true" /> Your activity
                  </button>
                  <button
                    type="button"
                    className="flex w-full items-center gap-3 border-t border-zinc-800 px-4 py-3 text-left text-sm text-red-400 transition hover:bg-zinc-800"
                    onClick={async () => {
                      try {
                        await logOut();
                        window.location.assign('/login');
                      } catch (error) {
                        setLogoutError(error.message);
                        setIsMoreOpen(false);
                      }
                    }}
                  >
                    <FiLogOut aria-hidden="true" /> Log out
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content Feed & Right Sidebar Container */}
      <main className="mx-auto flex w-full max-w-[1100px] items-start justify-center gap-12 px-4 pb-8 pt-16 sm:gap-8 sm:px-6 sm:py-8 lg:gap-16">
        
        {/* Center Column (Stories + Posts) */}
        <section className="w-full min-w-0 max-w-[470px]">
          <h1 className="mb-3 px-1 text-3xl font-normal tracking-wide [font-family:Billabong,'Brush_Script_MT',cursive]">
            Instagram
          </h1>

          {/* Stories Bar */}
          <div className="flex gap-4 overflow-x-auto scrollbar-none py-2 mb-6 border border-zinc-800 bg-black rounded-xl p-4">
            {stories.map((story) => (
              <button
                key={story.id}
                type="button"
                className="flex flex-shrink-0 flex-col items-center gap-1"
                aria-label={`View ${story.username}'s story`}
                onClick={() => setActiveStory(story)}
              >
                <div className={`w-16 h-16 rounded-full p-[2px] ${story.isUser ? 'border border-zinc-600' : 'bg-gradient-to-tr from-yellow-500 to-fuchsia-600'}`}>
                  <img src={story.avatar} alt={story.username} className="w-full h-full rounded-full object-cover border-2 border-black" />
                </div>
                <span className="text-xs text-zinc-400 truncate w-16 text-center">{story.username}</span>
              </button>
            ))}
          </div>

          {/* Posts Feed */}
          {feedPosts.map((post) => (
            <div key={post.id} id={`post-${post.id}`} className="border-b border-zinc-800 pb-4 mb-6">
              
              {/* Post Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label={`View ${post.username}'s profile`}
                    className="shrink-0"
                    onClick={() => openProfile(post.username)}
                  >
                    <img src={post.userAvatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                  </button>
                  <div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        className="text-xs font-semibold hover:underline"
                        onClick={() => openProfile(post.username)}
                      >
                        {post.username}
                      </button>
                      <FaCircleCheck
                        className="text-sm text-[#0095f6]"
                        role="img"
                        aria-label="Verified account"
                      />
                      <span className="text-sm font-black leading-none" aria-hidden="true">•</span>
                      <span className="text-xs text-zinc-400">{post.timeAgo === 'JUST NOW' ? 'now' : '1d'}</span>
                    </div>
                    {post.location && <p className="text-[10px] text-zinc-400">{post.location}</p>}
                  </div>
                </div>
                <div className="relative flex items-center gap-4">
                  <button
                    type="button"
                    className="rounded-md border border-white px-3 py-1 text-xs font-semibold text-white transition hover:bg-white hover:text-black"
                    aria-pressed={followedUsers.has(post.username)}
                    onClick={() => setFollowedUsers((previous) => {
                      const next = new Set(previous);
                      if (next.has(post.username)) next.delete(post.username);
                      else next.add(post.username);
                      return next;
                    })}
                  >
                    {followedUsers.has(post.username) ? 'Following' : 'Follow'}
                  </button>
                  <button
                    type="button"
                    aria-label="More post options"
                    aria-expanded={activePostMenuId === post.id}
                    className="text-zinc-400"
                    onClick={() => {
                      setPostMenuStatus('');
                      setActivePostMenuId((activeId) => activeId === post.id ? null : post.id);
                    }}
                  >
                    <FiMoreHorizontal />
                  </button>
                  {activePostMenuId === post.id && (
                    <div className="absolute right-0 top-full z-20 mt-2 w-48 overflow-hidden rounded-lg border border-zinc-700 bg-zinc-950 py-1 text-sm shadow-xl">
                      <button
                        type="button"
                        className="block w-full px-4 py-2 text-left hover:bg-zinc-800"
                        onClick={() => {
                          setSavedPostIds((previous) => {
                            const next = new Set(previous);
                            if (next.has(post.id)) next.delete(post.id);
                            else next.add(post.id);
                            return next;
                          });
                          setActivePostMenuId(null);
                        }}
                      >
                        {savedPostIds.has(post.id) ? 'Unsave post' : 'Save post'}
                      </button>
                      <button
                        type="button"
                        className="block w-full px-4 py-2 text-left hover:bg-zinc-800"
                        onClick={() => handleCopyPostLink(post.id)}
                      >
                        Copy link
                      </button>
                      <button
                        type="button"
                        className="block w-full px-4 py-2 text-left text-red-400 hover:bg-zinc-800"
                        onClick={() => {
                          setFeedPosts((previous) => previous.filter((item) => item.id !== post.id));
                          setActivePostMenuId(null);
                        }}
                      >
                        Hide post
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Post Image/Media */}
              <div className="relative rounded overflow-hidden border border-zinc-800 bg-zinc-900">
                <img
                  src={post.postImage}
                  alt="Post content"
                  className="w-full cursor-pointer select-none object-cover max-h-[500px]"
                  onDoubleClick={() => handlePostDoubleClick(post.id)}
                />
                {doubleClickedPostId === post.id && (
                  <GoHeartFill
                    className="post-like-burst pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl text-red-500 drop-shadow-lg"
                    aria-hidden="true"
                  />
                )}
                <div className="absolute bottom-4 right-4">
                  <button
                    type="button"
                    aria-label="Open messages"
                    className="flex items-center gap-3 rounded-full bg-zinc-800/90 px-5 py-4 text-white transition hover:bg-zinc-700"
                    onClick={() => {
                      setActiveConversationId('alex_dev');
                      setIsMessagesOpen(true);
                    }}
                  >
                    <FiSend className="text-2xl" aria-hidden="true" />
                    <span className="text-sm font-semibold">Messages</span>
                  </button>
                </div>
              </div>

              {/* Post Actions Bar */}
              <div className="flex justify-between items-center my-3 text-xl">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      aria-label={likedPostIds.has(post.id) ? 'Unlike post' : 'Like post'}
                      aria-pressed={likedPostIds.has(post.id)}
                      onClick={() => togglePostCount(post.id, setLikedPostIds, likedPostIds, 'likesCount')}
                    >
                      {likedPostIds.has(post.id)
                        ? <GoHeartFill className="text-red-500 transition" />
                        : <GoHeart className="transition hover:text-red-500" />}
                    </button>
                    <span className="text-xs">{formatCount(post.likesCount)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      aria-label="Focus comment field"
                      onClick={() => document.getElementById(`comment-${post.id}`)?.focus()}
                    >
                      <BsChat className="transition hover:text-zinc-400" />
                    </button>
                    <span className="text-xs">{formatCount(post.commentsCount)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      aria-label={resharedPostIds.has(post.id) ? 'Undo repost' : 'Repost'}
                      aria-pressed={resharedPostIds.has(post.id)}
                      onClick={() => togglePostCount(post.id, setResharedPostIds, resharedPostIds, 'reshares')}
                    >
                      <FaRetweet className={`text-[1.55rem] transition hover:text-zinc-400 ${resharedPostIds.has(post.id) ? 'text-green-400' : ''}`} />
                    </button>
                    <span className="text-xs">{formatCount(post.reshares)}</span>
                  </div>
                  <button
                    type="button"
                    aria-label="Share post"
                    onClick={() => {
                      setActiveConversationId('alex_dev');
                      setIsMessagesOpen(true);
                    }}
                  >
                    <FiSend className="transition hover:text-zinc-400" />
                  </button>
                </div>
                <button
                  type="button"
                  aria-label={savedPostIds.has(post.id) ? 'Unsave post' : 'Save post'}
                  aria-pressed={savedPostIds.has(post.id)}
                  onClick={() => setSavedPostIds((previous) => {
                    const next = new Set(previous);
                    if (next.has(post.id)) next.delete(post.id);
                    else next.add(post.id);
                    return next;
                  })}
                >
                  <FiBookmark className={`transition hover:text-zinc-400 ${savedPostIds.has(post.id) ? 'fill-white' : ''}`} />
                </button>
              </div>

              {/* Likes & Caption */}
              <p className="text-xs font-semibold mb-1">{formatCount(post.likesCount)} likes</p>
              <p className="text-xs mb-1">
                <button
                  type="button"
                  className="mr-2 font-semibold hover:underline"
                  onClick={() => openProfile(post.username)}
                >
                  {post.username}
                </button>
                {post.caption}
              </p>
              <p className="text-xs text-zinc-500 mb-2">View all {formatCount(post.commentsCount)} comments</p>
              {commentsByPost[post.id]?.map((comment, index) => (
                <p key={`${post.id}-comment-${index}`} className="mb-1 text-xs">
                  <span className="mr-2 font-semibold">{currentUsername}</span>{comment}
                </p>
              ))}
              {postMenuStatus && (
                <p className="fixed bottom-5 left-1/2 z-[80] -translate-x-1/2 rounded-lg bg-zinc-800 px-4 py-2 text-sm text-white shadow-lg" role="status">
                  {postMenuStatus}
                </p>
              )}

              {/* Add Comment Field */}
              <form
                className="mt-2 flex items-center justify-between border-t border-zinc-900 pt-3 text-xs text-zinc-500"
                onSubmit={(event) => handleCommentSubmit(event, post.id)}
              >
                <input
                  id={`comment-${post.id}`}
                  ref={(input) => {
                    commentInputRefs.current[post.id] = input;
                  }}
                  type="text" 
                  placeholder="Add a comment..." 
                  className="bg-transparent outline-none w-full text-white placeholder-zinc-500"
                  value={commentDrafts[post.id] || ''}
                  onChange={(event) => setCommentDrafts((previous) => ({
                    ...previous,
                    [post.id]: event.target.value,
                  }))}
                />
                <div className="relative ml-2">
                  <button
                    type="button"
                    aria-label="Add emoji to comment"
                    aria-expanded={activeCommentEmojiPostId === post.id}
                    className="text-sm text-zinc-500 transition hover:text-white"
                    onClick={() => setActiveCommentEmojiPostId((activePostId) => (
                      activePostId === post.id ? null : post.id
                    ))}
                  >
                    <FaRegSmile aria-hidden="true" />
                  </button>
                  {activeCommentEmojiPostId === post.id && (
                    <div
                      className="absolute bottom-full right-0 z-20 mb-2 grid w-52 grid-cols-8 gap-1 rounded-lg border border-zinc-700 bg-zinc-900 p-2 shadow-xl"
                      role="group"
                      aria-label="Choose an emoji"
                      onKeyDown={(event) => {
                        if (event.key === 'Escape') setActiveCommentEmojiPostId(null);
                      }}
                    >
                      {COMMENT_EMOJIS.map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          aria-label={`Insert ${emoji}`}
                          className="rounded p-1 text-lg leading-none transition hover:bg-zinc-700"
                          onClick={() => insertCommentEmoji(post.id, emoji)}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={!commentDrafts[post.id]?.trim()}
                  className="ml-3 font-semibold text-sky-400 disabled:opacity-40"
                >
                  Post
                </button>
              </form>
              <span className="text-[10px] text-zinc-600 mt-2 block">{post.timeAgo}</span>
            </div>
          ))}
        </section>

        {/* Right Sidebar (Suggestions & User Profile Info) */}
        <aside className="hidden w-80 shrink-0 pt-4 lg:block">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <img 
                src={currentUserAvatar}
                alt={`${currentUsername} profile`}
                className="w-12 h-12 rounded-full object-cover" 
              />
              <div>
                <h4 className="text-xs font-semibold">{currentUsername}</h4>
                <p className="text-xs text-zinc-400">{user.fullName}</p>
              </div>
            </div>
            <button className="text-xs text-[#0095f6] font-semibold">Switch</button>
          </div>

          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-semibold text-zinc-400">Suggested for you</span>
            <button className="text-xs font-semibold hover:text-zinc-300">See All</button>
          </div>

          {/* Suggestion item */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=150" alt="" className="w-8 h-8 rounded-full object-cover" />
              <div>
                <h5 className="text-xs font-semibold">react_community</h5>
                <p className="text-[10px] text-zinc-550">Followed by alex_dev</p>
              </div>
            </div>
            <button
              type="button"
              className="text-xs font-semibold text-[#0095f6] hover:text-white"
              aria-pressed={followedUsers.has('react_community')}
              onClick={() => setFollowedUsers((previous) => {
                const next = new Set(previous);
                if (next.has('react_community')) next.delete('react_community');
                else next.add('react_community');
                return next;
              })}
            >
              {followedUsers.has('react_community') ? 'Following' : 'Follow'}
            </button>
          </div>

          <div className="text-[11px] text-zinc-600 mt-8 space-y-2">
            <p>© 2026 INSTAGRAM FROM META</p>
          </div>
        </aside>

      </main>

      {logoutError && (
        <p
          className="fixed bottom-5 left-1/2 z-[90] -translate-x-1/2 rounded-lg bg-red-950 px-4 py-2 text-sm text-red-200 shadow-lg"
          role="alert"
        >
          {logoutError}
        </p>
      )}

      {isSavedPostsOpen && (
        <div
          className="fixed inset-0 z-[75] flex items-center justify-center bg-black/80 p-3 text-white sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="saved-posts-title"
          onClick={() => setIsSavedPostsOpen(false)}
        >
          <section
            className="flex max-h-[90svh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
              <h2 id="saved-posts-title" className="text-lg font-semibold">Saved posts</h2>
              <button
                type="button"
                aria-label="Close saved posts"
                className="text-xl"
                onClick={() => setIsSavedPostsOpen(false)}
              >
                <LuX />
              </button>
            </header>
            <div className="overflow-y-auto p-3 sm:p-5">
              {feedPosts.filter((post) => savedPostIds.has(post.id)).length ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {feedPosts.filter((post) => savedPostIds.has(post.id)).map((post) => (
                    <button
                      key={post.id}
                      type="button"
                      className="group relative aspect-square overflow-hidden rounded-md bg-zinc-900"
                      aria-label={`Open saved post by ${post.username}`}
                      onClick={() => {
                        setIsSavedPostsOpen(false);
                        window.setTimeout(() => {
                          document.getElementById(`post-${post.id}`)?.scrollIntoView({ behavior: 'smooth' });
                        }, 0);
                      }}
                    >
                      <img src={post.postImage} alt={`${post.username}'s saved post`} className="h-full w-full object-cover" />
                      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 p-3 text-left text-xs font-semibold opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
                        {post.username}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <FiBookmark className="mx-auto text-4xl text-zinc-400" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-semibold">Save posts for later</h3>
                  <p className="mt-2 text-sm text-zinc-500">Posts you save will show up here.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      )}

      {isSettingsOpen && (
        <div
          className="fixed inset-0 z-[75] flex items-center justify-center bg-black/80 p-4 text-white"
          role="dialog"
          aria-modal="true"
          aria-labelledby="settings-title"
          onClick={() => setIsSettingsOpen(false)}
        >
          <section
            className="w-full max-w-md overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
              <h2 id="settings-title" className="text-lg font-semibold">Settings</h2>
              <button
                type="button"
                aria-label="Close settings"
                className="text-xl"
                onClick={() => setIsSettingsOpen(false)}
              >
                <LuX />
              </button>
            </header>
            <div className="space-y-5 p-5">
              <div>
                <h3 className="text-sm font-semibold">Account</h3>
                <p className="mt-1 text-sm text-zinc-400">Signed in as {currentUsername}</p>
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-zinc-800 pt-4">
                <span>
                  <span className="block text-sm font-medium">Notification badge</span>
                  <span className="mt-1 block text-xs text-zinc-500">Show unread count in the sidebar</span>
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={showNotificationBadge}
                  aria-label="Show notification badge"
                  className={`relative h-6 w-11 shrink-0 rounded-full transition ${showNotificationBadge ? 'bg-sky-500' : 'bg-zinc-700'}`}
                  onClick={() => setShowNotificationBadge((visible) => !visible)}
                >
                  <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${showNotificationBadge ? 'left-6' : 'left-1'}`} />
                </button>
              </div>
              <p className="border-t border-zinc-800 pt-4 text-xs text-zinc-500">
                This is a frontend demo. Settings are saved only while this page is open.
              </p>
            </div>
          </section>
        </div>
      )}

      {isCreatePostOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 p-4 text-white"
          role="dialog"
          aria-modal="true"
          aria-labelledby="create-post-title"
          onClick={() => setIsCreatePostOpen(false)}
        >
          <form
            className="w-full max-w-xl overflow-hidden rounded-xl border border-zinc-700 bg-zinc-950"
            onClick={(event) => event.stopPropagation()}
            onSubmit={handleCreatePostSubmit}
          >
            <header className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
              <button
                type="button"
                aria-label="Close create post"
                className="text-xl text-zinc-300 hover:text-white"
                onClick={() => setIsCreatePostOpen(false)}
              >
                <LuX />
              </button>
              <h2 id="create-post-title" className="font-semibold">Create new post</h2>
              <button
                type="submit"
                disabled={!createPostImage}
                className="text-sm font-semibold text-sky-400 disabled:opacity-40"
              >
                Share
              </button>
            </header>

            <div className="grid gap-5 p-5 sm:grid-cols-[1.1fr_0.9fr]">
              <label className="flex min-h-64 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border border-dashed border-zinc-700 bg-black text-center transition hover:border-zinc-500">
                {createPostImage ? (
                  <img src={createPostImage} alt="Post preview" className="h-full max-h-80 w-full object-contain" />
                ) : (
                  <>
                    <LuPlus className="mb-3 text-4xl text-zinc-400" aria-hidden="true" />
                    <span className="text-sm font-medium">Select a photo</span>
                    <span className="mt-2 text-xs text-zinc-500">Image files up to 10 MB</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  aria-label="Select a photo for your post"
                  onChange={handleCreatePostImage}
                />
              </label>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={currentUserAvatar}
                    alt=""
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <span className="text-sm font-semibold">{currentUsername}</span>
                </div>
                <label className="flex-1">
                  <span className="sr-only">Write a caption</span>
                  <textarea
                    value={createPostCaption}
                    onChange={(event) => setCreatePostCaption(event.target.value)}
                    placeholder="Write a caption..."
                    maxLength={2200}
                    rows={5}
                    className="w-full resize-none bg-transparent text-sm outline-none placeholder:text-zinc-500"
                  />
                  <span className="block text-right text-xs text-zinc-500">{createPostCaption.length}/2200</span>
                </label>
                <label>
                  <span className="sr-only">Add location</span>
                  <input
                    type="text"
                    value={createPostLocation}
                    onChange={(event) => setCreatePostLocation(event.target.value)}
                    maxLength={100}
                    placeholder="Add location"
                    className="w-full border-t border-zinc-800 bg-transparent py-3 text-sm outline-none placeholder:text-zinc-500"
                  />
                </label>
              </div>
            </div>
            {createPostError && (
              <p className="px-5 pb-4 text-sm text-red-400" role="alert">{createPostError}</p>
            )}
            <p className="border-t border-zinc-800 px-5 py-3 text-xs text-zinc-500">
              Demo only — this post is added to your feed on this device and won’t upload to a server.
            </p>
          </form>
        </div>
      )}

      {isProfileOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-3 text-white sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="profile-title"
          onClick={() => setIsProfileOpen(false)}
        >
          <section
            className="flex max-h-[92svh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="flex items-center justify-between border-b border-zinc-800 px-4 py-4 sm:px-6">
              <span className="w-8" />
              <h2 id="profile-title" className="text-lg font-semibold">
                {isOwnProfile ? 'My Profile' : `${profileUsername}'s Profile`}
              </h2>
              <button
                type="button"
                aria-label="Close profile"
                className="rounded-full p-2 text-xl transition hover:bg-zinc-800"
                onClick={() => setIsProfileOpen(false)}
              >
                <LuX />
              </button>
            </header>
            <div className="overflow-y-auto p-5 sm:p-8">
              <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 border-b border-zinc-800 pb-8 sm:flex-row sm:items-start sm:gap-12">
                <img
                  src={profileAvatar}
                  alt={`${profileUsername} profile`}
                  className="h-24 w-24 shrink-0 rounded-full object-cover sm:h-32 sm:w-32"
                />
                <div className="min-w-0 flex-1 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                    <h3 className="text-xl font-normal">{profileUsername}</h3>
                    {isOwnProfile ? (
                      <button
                        type="button"
                        className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-semibold transition hover:bg-zinc-700"
                        onClick={() => {
                          setIsProfileOpen(false);
                          setCreatePostError('');
                          setIsCreatePostOpen(true);
                        }}
                      >
                        Create post
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-semibold transition hover:bg-zinc-700"
                        aria-pressed={followedUsers.has(profileUsername)}
                        onClick={() => setFollowedUsers((previous) => {
                          const next = new Set(previous);
                          if (next.has(profileUsername)) next.delete(profileUsername);
                          else next.add(profileUsername);
                          return next;
                        })}
                      >
                        {followedUsers.has(profileUsername) ? 'Following' : 'Follow'}
                      </button>
                    )}
                  </div>
                  <div className="mt-5 flex justify-center gap-6 text-sm sm:justify-start sm:gap-10">
                    <span><strong>{profilePosts.length}</strong> posts</span>
                    <span><strong>128</strong> followers</span>
                    <span><strong>{isOwnProfile ? followedUsers.size : 0}</strong> following</span>
                  </div>
                  <div className="mt-5">
                    {isOwnProfile ? (
                      <>
                        <p className="font-semibold">{user.fullName}</p>
                        <p className="mt-1 text-sm text-zinc-400">{user.fullName} · Welcome to my profile 👋</p>
                      </>
                    ) : (
                      <p className="text-sm text-zinc-400">Posts shared by @{profileUsername}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mx-auto max-w-3xl">
                <div className="flex items-center justify-center gap-2 border-b border-zinc-800 py-4 text-xs font-semibold uppercase tracking-widest text-zinc-300">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                  </svg>
                  Posts
                </div>
                {profilePosts.length > 0 ? (
                  <div className="grid grid-cols-3 gap-1 pt-1 sm:gap-3 sm:pt-3">
                    {profilePosts.map((post) => (
                      <button
                        key={post.id}
                        type="button"
                        className="group relative aspect-square overflow-hidden bg-zinc-900"
                        aria-label={`Open ${profileUsername}'s post: ${post.caption || 'photo'}`}
                        onClick={() => {
                          setIsProfileOpen(false);
                          window.setTimeout(() => {
                            document.getElementById(`post-${post.id}`)?.scrollIntoView({ behavior: 'smooth' });
                          }, 0);
                        }}
                      >
                        <img src={post.postImage} alt={`${profileUsername}'s post`} className="h-full w-full object-cover" />
                        <span className="absolute inset-0 flex items-center justify-center gap-4 bg-black/50 text-sm font-semibold opacity-0 transition group-hover:opacity-100">
                          <span>♥ {formatCount(post.likesCount)}</span>
                          <span>▢ {formatCount(post.commentsCount)}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                ) : isOwnProfile ? (
                  <div className="py-12 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-white text-2xl">
                      <LuPlus aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold">Share your first photo</h3>
                    <p className="mt-2 text-sm text-zinc-400">Your posts will appear on your profile.</p>
                    <button
                      type="button"
                      className="mt-4 text-sm font-semibold text-sky-400 hover:text-sky-300"
                      onClick={() => {
                        setIsProfileOpen(false);
                        setCreatePostError('');
                        setIsCreatePostOpen(true);
                      }}
                    >
                      Create your first post
                    </button>
                  </div>
                ) : (
                  <p className="py-12 text-center text-sm text-zinc-400">No posts yet.</p>
                )}
              </div>
            </div>
          </section>
        </div>
      )}

      {isSearchOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[60] bg-black/60"
            aria-label="Close search"
            onClick={() => setIsSearchOpen(false)}
          />
          <section
            className="fixed inset-y-0 left-0 z-[65] flex w-full flex-col border-r border-zinc-700 bg-zinc-950 text-white shadow-2xl sm:left-64 sm:w-[360px]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="search-panel-title"
          >
            <div className="border-b border-zinc-800 p-5">
              <div className="mb-5 flex items-center justify-between">
                <h2 id="search-panel-title" className="text-2xl font-semibold">Search</h2>
                <button
                  type="button"
                  aria-label="Close search"
                  className="text-xl"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <LuX />
                </button>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-zinc-800 px-3">
                <GoSearch className="shrink-0 text-zinc-400" aria-hidden="true" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search people or posts"
                  aria-label="Search people or posts"
                  autoFocus
                  className="min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-zinc-400"
                />
                {searchQuery && (
                  <button
                    type="button"
                    aria-label="Clear search"
                    className="text-zinc-400 hover:text-white"
                    onClick={() => setSearchQuery('')}
                  >
                    <LuX />
                  </button>
                )}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {!normalizedSearchQuery ? (
                <p className="py-8 text-center text-sm text-zinc-500">Search by username, caption, or location.</p>
              ) : matchingUsers.length === 0 && matchingPosts.length === 0 ? (
                <p className="py-8 text-center text-sm text-zinc-400">No results found for “{searchQuery.trim()}”.</p>
              ) : (
                <>
                  {matchingUsers.length > 0 && (
                    <section className="mb-6">
                      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">People</h3>
                      <div className="space-y-1">
                        {matchingUsers.map((user) => (
                          <button
                            key={user.username}
                            type="button"
                            className="flex w-full items-center gap-3 rounded-lg p-2 text-left hover:bg-zinc-900"
                            onClick={() => {
                              setIsSearchOpen(false);
                              if (user.post) {
                                window.setTimeout(() => {
                                  document.getElementById(`post-${user.post.id}`)?.scrollIntoView({ behavior: 'smooth' });
                                }, 0);
                              } else if (user.story) {
                                setActiveStory(user.story);
                              }
                            }}
                          >
                            <img src={user.avatar} alt="" className="h-11 w-11 rounded-full object-cover" />
                            <span className="text-sm font-semibold">{user.username}</span>
                          </button>
                        ))}
                      </div>
                    </section>
                  )}
                  {matchingPosts.length > 0 && (
                    <section>
                      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">Posts</h3>
                      <div className="space-y-1">
                        {matchingPosts.map((post) => (
                          <button
                            key={post.id}
                            type="button"
                            className="flex w-full items-center gap-3 rounded-lg p-2 text-left hover:bg-zinc-900"
                            onClick={() => {
                              setIsSearchOpen(false);
                              window.setTimeout(() => {
                                document.getElementById(`post-${post.id}`)?.scrollIntoView({ behavior: 'smooth' });
                              }, 0);
                            }}
                          >
                            <img src={post.postImage} alt="" className="h-12 w-12 shrink-0 rounded object-cover" />
                            <span className="min-w-0">
                              <span className="block text-sm font-semibold">{post.username}</span>
                              <span className="block truncate text-xs text-zinc-400">{post.caption}</span>
                              <span className="block truncate text-xs text-zinc-500">{post.location}</span>
                            </span>
                          </button>
                        ))}
                      </div>
                    </section>
                  )}
                </>
              )}
            </div>
          </section>
        </>
      )}

      {isNotificationsOpen && (
        <div
          className="fixed inset-0 z-[70] flex justify-start bg-black/60 text-white"
          role="dialog"
          aria-modal="true"
          aria-labelledby="notifications-title"
          onClick={() => setIsNotificationsOpen(false)}
        >
          <section
            className="flex h-full w-full max-w-md flex-col border-r border-zinc-700 bg-zinc-950 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="flex items-center justify-between border-b border-zinc-800 p-5">
              <div>
                <h2 id="notifications-title" className="text-xl font-semibold">Notifications</h2>
                <p className="mt-1 text-xs text-zinc-500">Recent activity · demo notifications</p>
              </div>
              <div className="flex items-center gap-3">
                {unreadNotificationsCount > 0 && (
                  <button
                    type="button"
                    className="text-xs font-semibold text-sky-400 hover:text-sky-300"
                    onClick={() => setNotifications((previous) => previous.map((notification) => ({
                      ...notification,
                      read: true,
                    })))}
                  >
                    Mark all read
                  </button>
                )}
                <button
                  type="button"
                  aria-label="Close notifications"
                  className="text-xl"
                  onClick={() => setIsNotificationsOpen(false)}
                >
                  <LuX />
                </button>
              </div>
            </header>
            <div className="flex-1 overflow-y-auto">
              {notifications.length ? notifications.map((notification) => {
                const targetPost = feedPosts.find((post) => post.id === notification.postId);
                return (
                  <button
                    key={notification.id}
                    type="button"
                    className={`flex w-full items-center gap-3 border-b border-zinc-900 px-4 py-4 text-left transition hover:bg-zinc-900 ${
                      notification.read ? '' : 'bg-zinc-900/50'
                    }`}
                    onClick={() => {
                      setNotifications((previous) => previous.map((item) => (
                        item.id === notification.id ? { ...item, read: true } : item
                      )));
                      setIsNotificationsOpen(false);
                      if (notification.kind === 'follow') {
                        setFollowedUsers((previous) => new Set(previous).add(notification.username));
                      } else if (targetPost) {
                        window.setTimeout(() => {
                          document.getElementById(`post-${targetPost.id}`)?.scrollIntoView({ behavior: 'smooth' });
                        }, 0);
                      }
                    }}
                  >
                    <img src={notification.avatar} alt="" className="h-11 w-11 shrink-0 rounded-full object-cover" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm leading-5">
                        <span className="font-semibold">{notification.username}</span>{' '}
                        <span className="text-zinc-300">{notification.message}</span>
                      </span>
                      <span className="mt-1 block text-xs text-zinc-500">{notification.time}</span>
                    </span>
                    {targetPost && (
                      <img src={targetPost.postImage} alt="" className="h-11 w-11 shrink-0 rounded object-cover" />
                    )}
                    {notification.kind === 'follow' && (
                      <span className="shrink-0 rounded-md border border-zinc-600 px-2 py-1 text-[10px] font-semibold">
                        {followedUsers.has(notification.username) ? 'Following' : 'Follow back'}
                      </span>
                    )}
                    {!notification.read && <span className="h-2 w-2 shrink-0 rounded-full bg-sky-500" />}
                  </button>
                );
              }) : (
                <p className="py-12 text-center text-sm text-zinc-500">You’re all caught up.</p>
              )}
            </div>
          </section>
        </div>
      )}

      {isExploreOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-3 text-white sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="explore-title"
          onClick={() => setIsExploreOpen(false)}
        >
          <section
            className="flex max-h-[92svh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="flex items-center justify-between border-b border-zinc-800 px-4 py-4 sm:px-6">
              <div>
                <h2 id="explore-title" className="text-xl font-semibold sm:text-2xl">Explore</h2>
                <p className="mt-1 text-xs text-zinc-400 sm:text-sm">Discover posts from the community</p>
              </div>
              <button
                type="button"
                aria-label="Close Explore"
                className="rounded-full p-2 text-xl transition hover:bg-zinc-800"
                onClick={() => setIsExploreOpen(false)}
              >
                <LuX />
              </button>
            </header>
            <div className="overflow-y-auto p-2 sm:p-4">
              {feedPosts.length ? (
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4">
                  {feedPosts.map((post) => (
                    <button
                      key={post.id}
                      type="button"
                      className="group relative aspect-square overflow-hidden rounded-md bg-zinc-900 text-left"
                      aria-label={`Explore post by ${post.username}: ${post.caption}`}
                      onClick={() => {
                        setIsExploreOpen(false);
                        window.setTimeout(() => {
                          document.getElementById(`post-${post.id}`)?.scrollIntoView({ behavior: 'smooth' });
                        }, 0);
                      }}
                    >
                      <img
                        src={post.postImage}
                        alt={`${post.username}'s post`}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                      <span className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/10 to-transparent p-2 opacity-100 transition sm:p-4 sm:opacity-0 sm:group-hover:opacity-100">
                        <span className="text-xs font-semibold sm:text-sm">{post.username}</span>
                        <span className="mt-1 line-clamp-2 text-[11px] text-zinc-200 sm:text-xs">{post.caption}</span>
                        <span className="mt-2 text-[11px] text-white sm:text-xs">
                          ♥ {formatCount(post.likesCount)} · {formatCount(post.commentsCount)} comments
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="py-12 text-center text-sm text-zinc-400">No posts to explore right now.</p>
              )}
            </div>
          </section>
        </div>
      )}

      {activeStory && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 p-0 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Story preview"
          onClick={() => setActiveStory(null)}
        >
          <button
            type="button"
            className="absolute right-5 top-5 z-10 text-3xl text-white"
            aria-label="Close story"
            onClick={() => setActiveStory(null)}
          >
            <LuX />
          </button>
          <div
            className="relative h-full max-h-[90vh] w-full max-w-[480px] overflow-hidden bg-zinc-950 sm:rounded-xl"
            onClick={(event) => event.stopPropagation()}
          >
            {activeStory.videoUrl ? (
              <video
                src={activeStory.videoUrl}
                className="h-full w-full object-contain"
                autoPlay
                controls
                playsInline
              />
            ) : (
              <img
                src={activeStory.storyImage || activeStory.avatar}
                alt="Story"
                className="h-full w-full object-contain"
              />
            )}
          </div>
        </div>
      )}

      {isMessagesOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="messages-dialog-title"
          onClick={() => setIsMessagesOpen(false)}
        >
          <div
            className="flex h-[min(80svh,640px)] w-full max-w-4xl overflow-hidden rounded-xl border border-zinc-700 bg-zinc-950 text-white"
            onClick={(event) => event.stopPropagation()}
          >
            <section className="flex w-[38%] min-w-[120px] flex-col border-r border-zinc-800 sm:w-72">
              <div className="flex items-center justify-between border-b border-zinc-800 p-4">
                <h2 id="messages-dialog-title" className="truncate text-base font-semibold sm:text-lg">Messages</h2>
                <button type="button" aria-label="Close messages" onClick={() => setIsMessagesOpen(false)}>
                  <LuX className="text-xl" />
                </button>
              </div>
              <p className="px-4 py-2 text-xs text-zinc-500">Demo inbox · messages are local</p>
              <div className="overflow-y-auto">
                {conversations.map((conversation) => {
                  const lastMessage = conversation.messages[conversation.messages.length - 1];
                  return (
                    <button
                      key={conversation.id}
                      type="button"
                      className={`flex w-full items-center gap-3 px-3 py-3 text-left transition hover:bg-zinc-900 ${
                        activeConversationId === conversation.id ? 'bg-zinc-900' : ''
                      }`}
                      aria-pressed={activeConversationId === conversation.id}
                      onClick={() => setActiveConversationId(conversation.id)}
                    >
                      <img src={conversation.avatar} alt="" className="h-10 w-10 shrink-0 rounded-full object-cover" />
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium">{conversation.username}</span>
                        <span className="block truncate text-xs text-zinc-500">
                          {lastMessage?.sender === 'me' ? 'You: ' : ''}{lastMessage?.text}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {conversations.filter((conversation) => conversation.id === activeConversationId).map((conversation) => (
              <section key={conversation.id} className="flex min-w-0 flex-1 flex-col">
                <header className="flex items-center gap-3 border-b border-zinc-800 px-4 py-3">
                  <img src={conversation.avatar} alt="" className="h-9 w-9 rounded-full object-cover" />
                  <h3 className="text-sm font-semibold">{conversation.username}</h3>
                </header>
                <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4" aria-live="polite">
                  <p className="mb-2 text-center text-xs text-zinc-500">
                    Demo conversation · incoming messages are sample messages
                  </p>
                  {conversation.messages.map((message) => (
                    <p
                      key={message.id}
                      className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                        message.sender === 'me'
                          ? 'self-end bg-sky-600 text-white'
                          : 'self-start bg-zinc-800 text-white'
                      }`}
                    >
                      {message.text}
                    </p>
                  ))}
                </div>
                <form className="flex gap-2 border-t border-zinc-800 p-3" onSubmit={handleMessageSubmit}>
                  <input
                    type="text"
                    value={messageDraft}
                    onChange={(event) => setMessageDraft(event.target.value)}
                    placeholder="Write a message..."
                    aria-label="Write a message"
                    className="min-w-0 flex-1 rounded-full border border-zinc-700 bg-black px-4 py-2 text-sm outline-none focus:border-zinc-500"
                  />
                  <button
                    type="submit"
                    disabled={!messageDraft.trim()}
                    className="rounded-full px-3 text-sm font-semibold text-sky-400 disabled:opacity-40"
                  >
                    Send
                  </button>
                </form>
              </section>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeFeed;