import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { SubscribeService } from './subscribe.service';
import BusAPI from '../api/ZHBusApi';
import { sendMail } from '../util/emailUtil';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private readonly subscribeService: SubscribeService) {}

  @Interval(60 * 1000)
  async handleInterval() {
    const list = await this.subscribeService.getSubscribesByNow();
    for (const sub of list) {
      const res = await BusAPI.getDiffBetweenBusAndStation({
        segmentid: Number(sub.segmentid),
        stationname: sub.stationname,
        subrouteid: Number(sub.subrouteid),
      });
      const { diff, time } = res.data;
      const html = `<div style="width: 800px;height: 280px;
          align-items: center;justify-content: center;
          display: flex;flex-direction: column;">
        <h2>公交到哪了</h2>
        <div style="border: 1px solid #cad5e8;padding: 24px">
            您好！<br>
            您订阅的路线离<strong>${sub.stationname}站</strong>还有${diff}个站,约${time}分钟后到达。
        </div>
      </div>`;
      sendMail({
        title: '【公交到哪了】公交到站提醒',
        content: html,
        receiver: sub.email,
      });
    }
  }
}
