// ����ĳ��SSR��Ⱦ���ֵ�����
// ���ĳ��DIV����data-server-rendered����Ϊ'true'����ʾ��һ���ֵ������ɷ���������Ⱦ���
// ����ɲο���https://ssr.vuejs.org/zh/guide/hydration.html

export const SSR_ATTR = 'data-server-rendered'

// ASSET TYPES�ں���ʹ��ʱ�����õ��ܶ�forEachѭ��
export const ASSET_TYPES = [
  // ���
  'component',
  // ָ��
  'directive',
  // ������
  'filter'
]

// �������ڹ��Ӻ������ƶ���
// ����ο���https://cn.vuejs.org/v2/api/#beforeCreate
export const LIFECYCLE_HOOKS = [
  // ��ʵ����ʼ��֮�����ݹ۲� (data observer) �� event/watcher �¼�����֮ǰ������
  'beforeCreate',

  // ��ʵ��������ɺ���������
  'created',

  // �ڹ��ؿ�ʼ֮ǰ�����ã���ص� render �����״α����á�SSRʱ������Ч
  'beforeMount',

  // el ���´����� vm.$el �滻�������ص�ʵ����ȥ֮����øù��ӡ�ע�� mounted �����ŵ���е������Ҳ��һ�𱻹��أ����Ҫ�ȴ�������ͼ��Ⱦ��ϣ�����ʹ��vm.$nextTick
  'mounted',

  // ���ݸ���֮ǰ����
  'beforeUpdate',

  // ���ݸ���֮�����
  'updated',

  // ʵ������֮ǰ����
  'beforeDestroy',
  // ʵ������֮�����
  'destroyed',
  // keep-alive �������ʱ����
  'activated',
  // keep-alive ���ͣ��ʱ����
  'deactivated',
  // ������һ��������������Ĵ���ʱ������
  'errorCaptured',
  // 2.6.0�������������������Ⱦʱ��ͨ��`serverPrefetch`Ԥ�Ƚ������ݻ�ȡ������һ��promise
  'serverPrefetch'
]
