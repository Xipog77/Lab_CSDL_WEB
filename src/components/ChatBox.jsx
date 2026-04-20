import React, { useState, useRef, useEffect } from 'react';
import { Card, Input, Button, Avatar, List, Typography, Space, message } from 'antd';
import { SendOutlined, RobotOutlined, UserOutlined } from '@ant-design/icons';
import './ChatBox.css';

const { TextArea } = Input;
const { Text } = Typography;

const ChatBox = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Xin chào! Tôi là trợ lý ảo của ClassicModels. Tôi có thể giúp bạn tìm kiếm thông tin về khách hàng, đơn hàng, và sản phẩm. Bạn cần hỗ trợ gì?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fake responses based on keywords
  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    if (message.includes('khách hàng') || message.includes('customer')) {
      return 'Tôi có thể giúp bạn tìm kiếm thông tin khách hàng. Bạn có thể tìm theo tên, quốc gia, hoặc thành phố. Bạn muốn tìm khách hàng nào?';
    }

    if (message.includes('đơn hàng') || message.includes('order')) {
      return 'Để tìm đơn hàng, bạn có thể lọc theo ID khách hàng, trạng thái đơn hàng, hoặc khoảng thời gian. Bạn cần tìm đơn hàng nào?';
    }

    if (message.includes('sản phẩm') || message.includes('product')) {
      return 'Tôi có thông tin về tất cả sản phẩm trong kho. Bạn có thể tìm theo tên sản phẩm hoặc dòng sản phẩm. Bạn quan tâm đến sản phẩm nào?';
    }

    if (message.includes('thống kê') || message.includes('statistics')) {
      return 'Tôi có thể cung cấp thống kê về doanh số khách hàng, đơn hàng theo thời gian, và sản phẩm bán chạy. Bạn muốn xem thống kê gì?';
    }

    if (message.includes('biểu đồ') || message.includes('chart')) {
      return 'Ứng dụng có các biểu đồ trực quan về phân bổ đơn hàng, top khách hàng, và sản phẩm bán chạy. Bạn có thể xem trong phần Statistics.';
    }

    if (message.includes('cảm ơn') || message.includes('thank')) {
      return 'Không có gì! Rất vui được giúp đỡ bạn. Nếu cần hỗ trợ thêm, hãy hỏi tôi nhé!';
    }

    if (message.includes('chào') || message.includes('hello') || message.includes('hi')) {
      return 'Xin chào! Chúc bạn một ngày tốt lành! Tôi có thể giúp gì cho bạn hôm nay?';
    }

    // Default responses
    const defaultResponses = [
      'Tôi hiểu rồi. Bạn có thể cung cấp thêm chi tiết để tôi hỗ trợ tốt hơn không?',
      'Câu hỏi thú vị! Để tôi giải thích cho bạn về tính năng này.',
      'Tôi sẽ giúp bạn tìm hiểu thông tin đó. Bạn có thể cho tôi biết thêm về yêu cầu của bạn không?',
      'ClassicModels có rất nhiều dữ liệu thú vị. Bạn muốn khám phá điều gì?',
      'Tôi luôn sẵn sàng hỗ trợ bạn. Hãy cho tôi biết bạn cần gì nhé!'
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: getBotResponse(inputValue),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card
      title={
        <Space>
          <RobotOutlined style={{ color: '#1890ff' }} />
          Trợ Lý Ảo ClassicModels
        </Space>
      }
      className="chatbox-container"
      bodyStyle={{ height: '500px', display: 'flex', flexDirection: 'column' }}
    >
      <div className="chat-messages">
        <List
          dataSource={messages}
          renderItem={(item) => (
            <List.Item className={`message-item ${item.type}`}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    icon={item.type === 'bot' ? <RobotOutlined /> : <UserOutlined />}
                    style={{
                      backgroundColor: item.type === 'bot' ? '#1890ff' : '#52c41a'
                    }}
                  />
                }
                title={
                  <Space>
                    <Text strong>
                      {item.type === 'bot' ? 'Trợ Lý' : 'Bạn'}
                    </Text>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {formatTime(item.timestamp)}
                    </Text>
                  </Space>
                }
                description={
                  <div className="message-content">
                    {item.content}
                  </div>
                }
              />
            </List.Item>
          )}
        />
        {isTyping && (
          <div className="typing-indicator">
            <Avatar
              icon={<RobotOutlined />}
              style={{ backgroundColor: '#1890ff' }}
              size="small"
            />
            <div className="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <Space.Compact style={{ width: '100%' }}>
          <TextArea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nhập tin nhắn của bạn..."
            autoSize={{ minRows: 1, maxRows: 3 }}
            style={{ resize: 'none' }}
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
          >
            Gửi
          </Button>
        </Space.Compact>
      </div>
    </Card>
  );
};

export default ChatBox;