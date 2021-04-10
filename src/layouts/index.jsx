import { Link } from 'umi';

export default function BasicLayout({ children }) {
  return (
    <div>
      <div>
        <Link to="/employee">新增成员信息</Link><br/>
        <Link to="/list">成员列表查看</Link>
      </div>
      {children}
    </div>
  );
}
