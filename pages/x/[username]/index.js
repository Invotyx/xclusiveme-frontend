import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { user } from '../../../actions/user';
import User from '../../../components/profile/user';
import { singleSelector } from '../../../selectors/userSelector';

export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { username } = router.query;
  useEffect(() => dispatch(user.requestOne(username), [dispatch]));
  const u = useSelector(singleSelector);

  return <User user={u} />;
}
