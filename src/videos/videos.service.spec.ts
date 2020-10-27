import {Test, TestingModule} from '@nestjs/testing';
import {VideosService} from './videos.service';
import {Video} from './entities/video.entity';
import {NotFoundException} from '@nestjs/common';
import {PaginationQueryDto} from "../common/dto/pagination-query.dto";
import { getModelToken } from '@nestjs/mongoose';

type MockRepository<T = any> = Partial<Record<any, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
});
describe('VideosService', () => {
  let videosService: VideosService;
 // let videoRepository: MockRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VideosService,
        {
          provide: getModelToken('Video'),
          useValue: createMockRepository(),
        },
      ],
    }).compile();
    videosService = module.get<VideosService>(VideosService);
   // videoRepository = module.get<MockRepository>(getModelToken('Video'));
  });
  it('should be defined', () => {
    expect(videosService).toBeDefined();
  });
  describe('findAll', () => {
    describe('when pagination exists', () => {
      it('should call with skip and take args', async () => {
        const paginationQueryDto = new PaginationQueryDto();
        paginationQueryDto.limit = 1;
        paginationQueryDto.page = 1;
        //await videosService.findAll({ limit: 1, page: 1 });
        expect(videosService.findAll({page: 1, limit: 1})).toHaveBeenCalledWith({
            skip: paginationQueryDto.page,
            limit: paginationQueryDto.limit
          }
        );
      });
    });
  });
});
