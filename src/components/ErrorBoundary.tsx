import React, { ErrorInfo, ReactNode } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-slate-100 shadow-xl text-center space-y-5">
            <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-slate-900">
                페이지를 불러오는 중 일시적인 오류가 발생했습니다
              </h2>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                네트워크 연결 상태나 화면 전환 과정에서 일시적인 지연이 발생할 수 있습니다.
                <br />
                아래 버튼을 눌러 바로 다시 시도해 보세요.
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={this.handleReset}
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-[#004481] hover:bg-[#003466] active:scale-95 text-white font-bold text-sm transition-all shadow-md cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>메인으로 이동 / 다시 시도</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
