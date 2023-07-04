import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface GoalInterface {
  id?: string;
  title: string;
  description?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface GoalGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  description?: string;
  user_id?: string;
}
