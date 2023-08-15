package seed

import (
	"github.com/jinzhu/gorm"
)

// var users = []models.User{
// 	models.User{
// 		Nickname: "Steven victor",
// 		Email:    "steven@gmail.com",
// 		Password: "password",
// 	},
// 	models.User{
// 		Nickname: "Martin Luther",
// 		Email:    "luther@gmail.com",
// 		Password: "password",
// 	},
// }

// var skills = []models.Skill{
// 	models.Skill{
// 		Title:   "Title 1",
// 		Content: "Hello world 1",
// 	},
// 	models.Skill{
// 		Title:   "Title 2",
// 		Content: "Hello world 2",
// 	},
// }

func Load(db *gorm.DB) {
	// , &models.User{}
	// err := db.Debug().DropTableIfExists(&models.Skill{}).Error
	// if err != nil {
	// 	log.Fatalf("cannot drop table: %v", err)
	// }
	// err = db.Debug().AutoMigrate(&models.User{}, &models.Skill{}).Error
	// if err != nil {
	// 	log.Fatalf("cannot migrate table: %v", err)
	// }

	// err = db.Debug().Model(&models.Skill{}).AddForeignKey("author_id", "users(id)", "cascade", "cascade").Error
	// if err != nil {
	// 	log.Fatalf("attaching foreign key error: %v", err)
	// }

	// for i, _ := range users {
	// 	err = db.Debug().Model(&models.User{}).Create(&users[i]).Error
	// 	if err != nil {
	// 		log.Fatalf("cannot seed users table: %v", err)
	// 	}
	// 	skills[i].AuthorID = users[i].ID

	// 	err = db.Debug().Model(&models.Skill{}).Create(&skills[i]).Error
	// 	if err != nil {
	// 		log.Fatalf("cannot seed skills table: %v", err)
	// 	}
	// }
}
