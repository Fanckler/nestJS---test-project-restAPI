import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';
import { Class } from './entities/class.entity';
import { Model } from "mongoose";

describe('Classes Controller', () => {
  let classesController: ClassesController;
  let classesService: ClassesService;
  const classesModel:any = Model<Class>

  beforeEach(() => {
    classesService = new ClassesService(classesModel);
    classesController = new ClassesController(classesService);
  });

  describe('findOne', () => {
    it('should return class', async () => {
      const result: any = {
        "data": {
          "duration": {
            "started": "2019-06-19T07:44:06.353Z",
            "closed": "2019-06-19T07:44:06.353Z"
          },
          "_id": "5f91606311d324a5c67fc4fc",
          "title": "Backend nestjs :)",
          "description": "Backend Online Class",
          "order": 2,
          "created": "2020-10-22T10:35:15.000",
          "lessons": [],
          "students": [],
          "modified": "2020-10-23T13:04:03.792Z"
        }
      };
      jest.spyOn(classesService, 'findOne').mockImplementation(() => result);

      expect(await classesController.findOne('5f91606311d324a5c67fc')).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of classes', async () => {
      const data: any = [
        {
          "duration": {
            "started": "2019-06-19T07:44:06.353Z",
            "closed": "2019-06-19T07:44:06.353Z"
          },
          "_id": "5f91606311d324a5c67fc4fc",
          "title": "Backend nestjs :)",
          "description": "Backend Online Class",
          "order": 2,
          "created": "2020-10-22T10:35:15.000",
          "lessons": [],
          "students": [],
          "modified": "2020-10-23T13:04:03.792Z"
        }
      ]
      jest.spyOn(classesService, 'findAll').mockImplementation(() => data);

      expect(await classesController.findAll({limit: 2, page: 1})).toBe(data);
    });
  });

});
