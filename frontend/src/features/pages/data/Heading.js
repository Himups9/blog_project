const Heading = [
    {
      id: 1,
      title: "Explore Technology",
      description: "Latest news, tutorials, and insights for modern developers.",
    },
    {
      id: 2,
      title: "Build Smarter",
      description: "Master React, Django, Python, and modern web development.",
    },
    {
      id: 3,
      title: "Stay Ahead",
      description: "Learn AI, cybersecurity, programming, and emerging technologies.",
      },
      {
      id: 4,
      title: "Explore Technology",
      description: "Latest news, tutorials, and insights for modern developers.",
    },
    {
      id: 5,
      title: "Build Smarter",
      description: "Master React, Django, Python, and modern web development.",
    },
  ];

  export const getRandomHeadings = (count = 3) => {
    const shuffled = [...Heading];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, count);
};


  export default Heading;