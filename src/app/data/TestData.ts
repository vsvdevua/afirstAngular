import {Category} from '../model/Category';
import {Priority} from '../model/Priority';
import {Task} from '../model/Task';

export class TestData {

  static categories: Category[] = [
    {id: 1, title: 'Work'},
    {id: 2, title: 'Family'},
    {id: 3, title: 'Learn'},
    {id: 4, title: 'Timeoff'},
    {id: 5, title: 'Sport'},
    {id: 6, title: 'Food'},
    {id: 7, title: 'Money'},
    {id: 8, title: 'Gadgets'},
    {id: 9, title: 'Health'},
    {id: 10, title: 'Car'},
  ];

  static priorities: Priority[] = [
    {id: 1, title: 'Low', color: '#e5e5e5'},
    {id: 2, title: 'Middle', color: '#85D1B2'},
    {id: 3, title: 'Hight', color: '#F1828D'},
    {id: 4, title: 'Higest', color: '#F1128D'},
  ];

  static tasks: Task[] = [
    {
      id: 1,
      title: 'pour gasoline into cars',
      priority: TestData.priorities[2],
      completed: false,
      category: TestData.categories[9],
      date: new Date('2020-03-10')
    },
    {
      id: 2,
      title: 'create rest service',
      priority: TestData.priorities[0],
      completed: false,
      category: TestData.categories[0],
      date: new Date('2021-03-11')
    },
    {
      id: 3,
      title: 'clean flat and To water flowers',
      priority: TestData.priorities[2],
      completed: true,
      category: TestData.categories[1],
    },
    {
      id: 4,
      title: 'walk with family and friends',
      priority: TestData.priorities[1],
      completed: false,
      category: TestData.categories[1],
      date: new Date('2021-05-11')
    },
    {
      id: 5,
      title: 'learn angular',
      priority: TestData.priorities[3],
      completed: false,
      category: TestData.categories[2],
      date: new Date('2021-07-11')
    },

    {
      id: 6,
      title: 'attend the conference devoxx',
      priority: TestData.priorities[1],
      completed: false,
      category: TestData.categories[2],
      date: new Date('2021-10-11')
    },
    {
      id: 7,
      title: 'buy tickets to maldives',
      priority: TestData.priorities[2],
      completed: false,
      category: TestData.categories[3],
      date: new Date('2021-06-20')
    },

    {
      id: 8,
      title: 'make dinner for family',
      completed: false,
      category: TestData.categories[5],
      date: new Date('2021-04-11')
    },
    {
      id: 9,
      title: 'lose 3 kg',
      priority: TestData.priorities[3],
      completed: false,
      category: TestData.categories[4],
      date: new Date('2021-05-11')
    },
    {
      id: 10,
      title: 'run 1 mile',
      priority: TestData.priorities[0],
      completed: true,
      category: TestData.categories[4],
      date: new Date('2021-05-11')
    },
    {
      id: 11,
      title: 'buy new leptop',
      priority: TestData.priorities[3],
      completed: true,
      category: TestData.categories[7],
      date: new Date('2021-04-11')
    },
  ];
}
