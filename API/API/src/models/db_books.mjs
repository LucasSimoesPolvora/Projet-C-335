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
                type: DataTypes.TEXT('long'),
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


export { bookModel };
