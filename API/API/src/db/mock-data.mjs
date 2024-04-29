let books = [
  {
    id_book: 1,
    booTitle: "The case Charles Dexter Ward",
    booPageCount: 300,
    booExcerpt: "https://www.globalgreyebooks.com/case-of-charles-dexter-ward-ebook.html",
    booSummary: "A man become crazy and his family want to help him.",
    booAvgRating: 4.0,
    booCoverImage: "https://2.bp.blogspot.com/-PXvELHryl4s/V7NmWWOG_DI/AAAAAAAAAzA/u-W2uKmHXVwMVZ_F6eYufsSdr361q06zQCLcB/s1600/AffaireCharlesDexterWard.jpg",
    booPublishDate: new Date(),
    booEpub: `./Dickens, Charles - Oliver Twist.epub`,
    fk_user: 1,
    fk_publisher: 1,
    fk_category: 1,
  },
];

let authors = [
  {
    id_author: 1,
    autFirstName: "Howard Phillips",
    autLastName: "Lovecraft"
  },
  {
    id_author: 2,
    autFirstName: "Arthur Conan",
    autLastName: "Doyle"
  },
  {
    id_author: 3,
    autFirstName: "Sun",
    autLastName: "Tzu"
  },
]
let writers = [
  {
    id_author: 1,
    autFirstName: "HP",
    autLastName: "Lovecraft"
  },
  {
    id_author: 2,
    autFirstName: "Arthur",
    autLastName: "Conan Doyle"
  },
  {
    id_author: 3,
    autFirstName: "Sun",
    autLastName: "Tzu"
  }
];

let publishers = [
  {
    id_publisher: 1,
    pubName: "J'ai lu"
  },
  {
    id_publisher: 2,
    pubName: "Librio"
  },
  {
    id_publisher: 3,
    pubName: "???"
  },
];

let categories = [
  {
    id_category: 1,
    catName: "horror"
  },
  {
    id_category: 2,
    catName: "mystery"
  },
  {
    id_category: 3,
    catName: "military strategy"
  }
];

let users = [
  {
    id_user: 1,
    usePseudo: "etml",
    usePassword: "etml",
    useJoinDate: "2024-03-02 09:10:36",
    useBookCount: 3,
    useReviewCount: 3
  }
];

let wrotes = [
  {
    fk_book: 1,
    fk_author: 1
  },
  {
    fk_book: 2,
    fk_author: 2
  },
  {
    fk_book: 3,
    fk_author: 3
  }
];

let reviews = [
  {
    fk_user: 1,
    fk_book: 1,
    revDate: "02/03/2024 09:13",
    revComment: "good.",
    revRating: 4.5
  },
  {
    fk_user: 1,
    fk_book: 2,
    revDate: "02/03/2024 09:13",
    revComment: "Yes.",
    revRating: 3
  },
  {
    fk_user: 1,
    fk_book: 3,
    revDate: "02/03/2024 09:13",
    revComment: "Perfect.",
    revRating: 5,
  }
]


export { books, writers, publishers, categories, users, wrotes, reviews, authors }