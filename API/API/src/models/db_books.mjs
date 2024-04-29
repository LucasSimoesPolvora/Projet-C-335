// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
// https://sequelize.org/docs/v7/models/data-types/
// Defines a model for transforming the data from json (within the mock-data file) to a json format ready to be exported to mysql.


const bookModel = (sequelize, DataTypes) => {
    return sequelize.define(
        "t_books",
        {
            id_book: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            booTitle: {
                type: DataTypes.STRING(100),
                allowNull: true,
                validate: {
                    // notNull: {
                    //     msg: "Le titre est requis",
                    // },
                    len: {
                        args: [1, 100],
                        msg: "Le titre doit comporter entre 1 et 100 caractères",
                    },
                },
            },
            booPageCount: {
                type: DataTypes.INTEGER,
                allowNull: true,
                validate: {
                    // notNull: {
                    //     msg: "Le nombre de pages est requis",
                    // },
                    min: {
                        args: [1],
                        msg: "Le nombre de pages doit être supérieur à 0",
                    },
                },
            },
            booExcerpt: {
                type: DataTypes.STRING(300),
                validate: {
                    len: {
                        args: [0, 500],
                        msg: "L'extrait doit comporter au plus 300 caractères",
                    },
                },
            },
            booSummary: {
                type: DataTypes.STRING(900),
                validate: {
                    len: {
                        args: [0, 900],
                        msg: "Le résumé doit comporter au plus 100 caractères",
                    },
                },
            },
            booAvgRating: {
                type: DataTypes.DECIMAL(3, 2),
                validate: {
                    isDecimal: {
                        msg: "La note moyenne doit être un nombre décimal",
                    },
                    min: {
                        args: [0],
                        msg: "La note moyenne doit être d'au moins 0",
                    },
                    max: {
                        args: [5],
                        msg: "La note moyenne doit être au plus 5",
                    },
                },
            },
            booCoverImage: {
                type: DataTypes.STRING(300),
                validate: {
                    isUrl: {
                        msg: "L'image de couverture doit être une URL valide",
                    },
                },
            },
            booPublishDate: {
                type: DataTypes.DATE,
                allowNull: true,
                validate: {
                    // notNull: {
                    //     msg: "La date de publication est requise",
                    // },
                    isDate: {
                        msg: "La date de publication doit être une date valide",
                    },
                },
            },
            booEpub : {
                type: DataTypes.BLOB('long'),
                allowNull: true,
                validate: {
                    
                }          
            },
            fk_user: {
                type: DataTypes.INTEGER,
                allowNull: true,
                validate: {
                    // notNull: {
                    //     msg: "L'identifiant de l'utilisateur est requis",
                    // },
                },
            },
            fk_publisher: {
                type: DataTypes.INTEGER,
                allowNull: true,
                validate: {
                    // notNull: {
                    //     msg: "L'identifiant de l'éditeur est requis",
                    // },
                },
            },
        }
    );
};

const epubModel = (sequelize, DataTypes) => {
    return sequelize.define(
        "t_epub",
        {
            id_epub: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            epub : {
                type: DataTypes.BLOB('long'),
                allowNull: true,
                validate: {
                    
                }          
            },
        }
    );
};

const reviewModel = (sequelize, DataTypes) => {
    return sequelize.define(
        "t_reviews",
        {
            fk_user: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    // notNull: {
                    //     msg: "L'identifiant de l'utilisateur est requis",
                    // },
                },
            },
            fk_book: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    // notNull: {
                    //     msg: "L'identifiant du livre est requis",
                    // },
                },
            },
            revDate: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    // notNull: {
                    //     msg: "La date de l'avis est requise",
                    // },
                },
            },
            revComment: {
                type: DataTypes.STRING(300),
                validate: {
                    len: {
                        args: [0, 300],
                        msg: "Le commentaire doit comporter au maximum 300 caractères",
                    },
                },
            },
            revRating: {
                type: DataTypes.DECIMAL(3, 2),
                allowNull: false,
                validate: {
                    // notNull: {
                    //     msg: "La note est requise",
                    // },
                    min: {
                        args: [0],
                        msg: "La note doit être d'au moins 0",
                    },
                    max: {
                        args: [5],
                        msg: "La note doit être au maximum de 5",
                    },
                },
            },
        }
    );
};

const userModel = (sequelize, DataTypes) => {
    return sequelize.define(
        "t_users",
        {
            id_user: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            usePseudo: {
                type: DataTypes.STRING(50),
                allowNull: false,
                validate: {
                    // notNull: {
                    //     msg: "Le pseudo est requis",
                    // },
                    len: {
                        args: [1, 50],
                        msg: "Le pseudo doit comporter entre 1 et 50 caractères",
                    },
                },
            },
            usePassword: {
                type: DataTypes.STRING(),
                allowNull: false,
                validate: {
                    // notNull: {
                    //     msg: "Le mot de passe est requis",
                    // },
                },
            },
            useJoinDate: {
                type: DataTypes.DATEONLY,
                allowNull: false,
                validate: {
                    // notNull: {
                    //     msg: "La date d'inscription est requise",
                    // },
                    isDate: {
                        msg: "La date d'inscription doit être une date valide",
                    },
                },
            },
            useBookCount: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    // notNull: {
                    //     msg: "Le nombre de livres est requis",
                    // },
                },
            },
            useReviewCount: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    // notNull: {
                    //     msg: "Le nombre d'avis est requis",
                    // },
                },
            },
        }
    );
};

const wroteModel = (sequelize, DataTypes) => {
    return sequelize.define(
        "t_wrote",
        {
            fk_author: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                validate: {
                    // notNull: {
                    //     msg: "L'ID de l'auteur est requis",
                    // },
                },
            },
            fk_book: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                validate: {
                    // notNull: {
                    //     msg: "L'ID du livre est requis",
                    // },
                },
            }, 
        },
        {
            freezeTableName: true
        }
    );
};

const categorizeModel = (sequelize, DataTypes) => {
    return sequelize.define(
        "t_categorize",
        {
            fk_category: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: true,
                validate: {
                    // notNull: {
                    //     msg: "L'ID du categorie est requis",
                    // },
                },
            },
            fk_book: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: true,
                validate: {
                    // notNull: {
                    //     msg: "L'ID du livre est requis",
                    // },
                },
            }, 
        },
        {
            freezeTableName: true
        }
    );
};

const publisherModel = (sequelize, DataTypes) => {
    return sequelize.define(
        "t_publishers",
        {
            id_publisher: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            pubName: {
                type: DataTypes.STRING(50),
                allowNull: false,
                validate: {
                    // notNull: {
                    //     msg: "Le nom de l'éditeur est requis",
                    // },
                    len: {
                        args: [1, 50],
                        msg: "Le nom de l'éditeur doit comporter entre 1 et 50 caractères",
                    },
                },
            },
        }
    );
};

const categoryModel = (sequelize, DataTypes) => {
    return sequelize.define(
        "t_categories",
        {
            id_category: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            catName: {
                type: DataTypes.STRING(50),
                allowNull: false,
                validate: {
                    // notNull: {
                    //     msg: "Le nom de la catégorie est requis",
                    // },
                    len: {
                        args: [1, 50],
                        msg: "Le nom de la catégorie doit comporter entre 1 et 50 caractères",
                    },
                },
            },
        }
    );
};


const authorModel = (sequelize, DataTypes) => {
    return sequelize.define(
        "t_authors",
        {
            id_author: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            autFirstName: {
                type: DataTypes.STRING(50),
                allowNull: false,
                validate: {
                    // notNull: {
                    //     msg: "Le prénom de l'auteur est requis",
                    // },
                    len: {
                        args: [1, 50],
                        msg: "Le prénom de l'auteur doit comporter entre 1 et 50 caractères",
                    },
                },
            },
            autLastName: {
                type: DataTypes.STRING(50),
                allowNull: false,
                validate: {
                    // notNull: {
                    //     msg: "Le nom de famille de l'auteur est requis",
                    // },
                    len: {
                        args: [1, 50],
                        msg: "Le nom de famille de l'auteur doit comporter entre 1 et 50 caractères",
                    },
                },
            },
        }
    );
};

export { bookModel, reviewModel, userModel, wroteModel, publisherModel, categoryModel, authorModel, categorizeModel, epubModel };
